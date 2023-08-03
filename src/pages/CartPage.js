import React, { useContext } from "react";
import { Container, Row, Col, Button, ListGroup, Image, Card } from 'react-bootstrap';
import { FaTrash } from "react-icons/fa";
import styled from 'styled-components';
import { motion } from 'framer-motion';
import tw from 'twin.macro';
import { CartContext } from "../contexts/CartContext";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from 'react-router-dom';

const Wrapper = styled.div`
  ${tw`flex justify-center items-center h-screen`}
`;

const CartPage = () => {
  const [cart, setCart] = useContext(CartContext); 
  const navigate = useNavigate();

  const handleRemoveFromCart = (id) => {
    const newCart = cart.filter(item => item.id !== id);
    setCart(newCart);
    toast.success('Product removed from cart', {
      position: toast.POSITION.TOP_CENTER
    });
  }

  return (
    <Wrapper>
      <Container>
        <Row>
          <Col xs={12} md={8}>
            <h2>Shopping Cart</h2>
            {cart.length === 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                Your cart is empty
              </motion.div>
            ) : (
              <ListGroup variant="flush">
                {cart.map((item) => (
                  <ListGroup.Item key={item.id}>
                    <Row>
                      <Col xs={4} md={2}>
                        <Image src={item.cartImage} alt={item.name} fluid rounded />
                      </Col>
                      <Col xs={4} md={7}>
                        <Row className="align-items-center">
                          <Col>{item.name}</Col>
                        </Row>
                      </Col>
                      <Col xs={4} md={3}>
                        <Row className="align-items-center justify-content-md-end">
                          <Col>${item.price} x {item.quantity} = ${item.price * item.quantity}</Col>
                          <Col>
                            <Button variant="light" size="sm" onClick={() => handleRemoveFromCart(item.id)}>
                              <FaTrash size={18} />
                            </Button>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Col>
          <Col xs={12} md={4}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>Subtotal</h2>
                  ${cart.reduce((a, c) => a + c.price * c.quantity, 0)}
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button type="button" className="btn-block" disabled={cart.length === 0} onClick={() => navigate('/checkout')}>
                    Proceed To Checkout
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
};

export default CartPage;

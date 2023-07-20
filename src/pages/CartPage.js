import React from "react";
import { Container, Row, Col, Button, ListGroup, Image, Card } from 'react-bootstrap';
import { FaTrash } from "react-icons/fa";
import styled from 'styled-components';
import { motion } from 'framer-motion';
import tw from 'twin.macro';

const Wrapper = styled.div`
  ${tw`flex justify-center items-center h-screen`}
`;

const cartItems = [
  { id: 1, name: 'Item 1', image: 'https://via.placeholder.com/150', price: 100, qty: 2 },
  { id: 2, name: 'Item 2', image: 'https://via.placeholder.com/150', price: 150, qty: 1 },
  { id: 3, name: 'Item 3', image: 'https://via.placeholder.com/150', price: 200, qty: 3 }
]

const CartPage = () => {
  return (
    <Wrapper>
      <Container>
        <Row>
          <Col xs={12} md={8}>
            <h2>Shopping Cart</h2>
            {cartItems.length === 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                Your cart is empty
              </motion.div>
            ) : (
              <ListGroup variant="flush">
                {cartItems.map((item) => (
                  <ListGroup.Item key={item.id}>
                    <Row>
                      <Col xs={4} md={2}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col xs={4} md={7}>
                        <Row className="align-items-center">
                          <Col>{item.name}</Col>

                        </Row>
                      </Col>
                      <Col xs={4} md={3}>
                        <Row className="align-items-center justify-content-md-end">
                          <Col>${item.price} x {item.qty} = ${item.price * item.qty}</Col>
                          <Col>
                            <Button variant="light" size="sm">
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
                  <h2>Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)}) items</h2>
                  ${cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button type="button" className="btn-block" disabled={cartItems.length === 0}>
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

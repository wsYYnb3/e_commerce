import React from "react";
import {
  Container,
  Row,
  Col,
  Button,
  ListGroup,
  Image,
  Card,
  Form,
} from "react-bootstrap";
import { FaTrash, FaShoppingCart } from "react-icons/fa";
import styled from "styled-components";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, adjustQuantity } from "../services/cartSlice";

const StyledWrapper = styled.div`
  background-color: #f4f4f4;
  min-height: 100vh;
  padding: 50px 0;
`;

const StyledCard = styled(Card)`
  background-color: #ffdb59;
  color: #333;
`;

const StyledListGroupItem = styled(ListGroup.Item)`
  background-color: #f7f7f7;
`;

const CartPage = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
    toast.error("Product removed from cart", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const handleAdjustQuantity = (id, qty) => {
    dispatch(adjustQuantity({ id, quantity: qty }));
  };

  return (
    <StyledWrapper>
      <Container>
        <Row>
          <Col md={9}>
            <h2>
              <FaShoppingCart /> Shopping Cart
            </h2>
            {cart.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                Your cart is empty
              </motion.div>
            ) : (
              <ListGroup variant='flush'>
                {cart.map((item) => (
                  <StyledListGroupItem key={item.id}>
                    <Row className='align-items-center'>
                      <Col md={2}>
                        <Image
                          src={item.cartImage}
                          alt={item.name}
                          fluid
                          rounded
                        />
                      </Col>
                      <Col md={4}>
                        <b>{item.name}</b>
                        <br />
                        {item.unit}
                      </Col>
                      <Col md={2}>
                        ${item.price} * {item.quantity}
                      </Col>
                      <Col md={2}></Col>
                      <Col md={2}>
                        <Button
                          variant='danger'
                          size='sm'
                          onClick={() => handleRemoveFromCart(item.id)}
                        >
                          <FaTrash />
                        </Button>
                      </Col>
                    </Row>
                  </StyledListGroupItem>
                ))}
              </ListGroup>
            )}
          </Col>
          <Col md={3}>
            <StyledCard>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>
                    Subtotal (
                    {cart.reduce((acc, item) => acc + item.quantity, 0)}) items
                  </h3>
                  $
                  {cart.reduce(
                    (acc, item) => acc + item.price * item.quantity,
                    0
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    type='button'
                    className='btn-block'
                    disabled={cart.length === 0}
                    onClick={() => navigate("/checkout")}
                  >
                    Proceed To Checkout
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </StyledCard>
          </Col>
        </Row>
      </Container>
    </StyledWrapper>
  );
};
export default CartPage;

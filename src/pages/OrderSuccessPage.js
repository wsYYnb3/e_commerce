import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import styled from "styled-components";
import { FiCheckCircle } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import {
  SuccessMessage,
  OrderDetails,
  OrderID,
  CTAButton,
} from "../styles/OrderSuccess";

function OrderSuccessPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col md='6'>
          <SuccessMessage>
            <FiCheckCircle size={50} /> Order Submitted Successfully
          </SuccessMessage>
          <OrderDetails>
            <OrderID>Order ID: {orderId} </OrderID>
          </OrderDetails>
          <div className='text-center'>
            <CTAButton
              variant='primary'
              onClick={() => {
                navigate(`/store`);
              }}
            >
              Continue Shopping
            </CTAButton>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default OrderSuccessPage;

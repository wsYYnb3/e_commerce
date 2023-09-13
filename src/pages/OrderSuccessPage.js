import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import styled from "styled-components";
import { FiCheckCircle } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
const SuccessMessage = styled.h1`
  color: green;
  text-align: center;
  margin-top: 50px;
`;

const OrderDetails = styled.div`
  margin: 20px;
  padding: 20px;
  border: 1px solid #ddd;
`;

const OrderID = styled.p`
  font-size: 1.2em;
`;

const Summary = styled.p`
  font-size: 1em;
`;

const CTAButton = styled(Button)`
  margin-top: 20px;
`;

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

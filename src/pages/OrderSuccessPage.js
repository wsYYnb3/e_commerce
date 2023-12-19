import React, { useEffect, useState, useCallback } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FiCheckCircle } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import {
  SuccessMessage,
  OrderDetails,
  OrderID,
  CTAButton,
} from "../styles/OrderSuccess";
import { getAllOrdersID } from "../utils/utils";
import LoadingIndicator from "../components/LoadingIndicator";
function OrderSuccessPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchOrderDetails = useCallback(async () => {
    try {
      const resp = await getAllOrdersID();
      const foundOrder = resp.data.find((o) => o.id === orderId);
      setOrder(foundOrder);
    } catch (error) {
      console.error("Failed to fetch order details:", error);
    } finally {
      setLoading(false);
    }
  }, [orderId]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchOrderDetails();
  }, [fetchOrderDetails]);

  if (loading) {
    return <LoadingIndicator />;
  }

  if (!order) {
    return <p>This page doesn't exist</p>;
  }

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

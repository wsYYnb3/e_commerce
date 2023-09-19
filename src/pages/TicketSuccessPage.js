import React, { useEffect, useState } from "react";
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
import LoadingIndicator from "../components/LoadingIndicator";
import { getAllTicketsID } from "../utils/utils";
function TicketSuccessPage() {
  const { ticketId } = useParams();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTicketsDetails = async () => {
    try {
      const resp = await getAllTicketsID();
      const foundTicket = resp.data.find((o) => o.id === ticketId);
      setTicket(foundTicket);
    } catch (error) {
      console.error("Failed to fetch ticket details:", error);
    } finally {
      setLoading(false);
    }
  };
  const navigate = useNavigate();
  useEffect(() => {
    fetchTicketsDetails();
  }, [ticketId]);

  if (loading) {
    return <LoadingIndicator />;
  }

  if (!ticket) {
    return <p>This page doesn't exist</p>;
  }
  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col md='6'>
          <SuccessMessage>
            <FiCheckCircle size={50} /> Ticket Submitted Successfully
          </SuccessMessage>
          <OrderDetails>
            <OrderID>Ticket ID: {ticketId} </OrderID>
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

export default TicketSuccessPage;

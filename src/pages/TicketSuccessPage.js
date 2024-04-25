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
import LoadingIndicator from "../components/LoadingIndicator";
import { getAllTicketsID } from "../utils/utils";
function TicketSuccessPage() {
  const { ticketId } = useParams();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const fetchTicketsDetails = useCallback(async () => {
    try {
      const resp = await getAllTicketsID();
      const foundTicket = resp.data.find((o) => o.id === Number(ticketId));
      setTicket(foundTicket);
    } catch (error) {
      console.error("Failed to fetch ticket details:", error);
    } finally {
      setLoading(false);
    }
  }, [ticketId]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchTicketsDetails();
  }, [ticketId, fetchTicketsDetails]);

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

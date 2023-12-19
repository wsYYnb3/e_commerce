import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaBox, FaCalendarAlt, FaMoneyBill } from "react-icons/fa";
import { useSpring, animated } from "react-spring";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useUser } from "@clerk/clerk-react";
import { FaUserCircle } from "react-icons/fa";
import { Dropdown } from "react-bootstrap";
import {
  HeaderContainer,
  OrderCard,
  IconText,
} from "../../styles/OrdersPageStyles";
import {
  StyledDropdown,
  StyledButton,
} from "../../styles/AdminOrdersPageStyles";
import { fetchAllTickets, updateTicket } from "../../services/adminSlice";
import LoadingIndicator from "../../components/LoadingIndicator";
const AdminSupportPage = () => {
  const fade = useSpring({ from: { opacity: 0 }, opacity: 1 });
  const tickets = useSelector((state) => state.admin.ticketsItems);
  const dispatch = useDispatch();

  const { t } = useTranslation();
  const { user } = useUser();
  const [isUpdating, setIsUpdating] = React.useState({});
  const adminId = user?.id;

  useEffect(() => {
    dispatch(fetchAllTickets(adminId));
  }, [dispatch, adminId]);

  const [selectedStatus, setSelectedStatus] = React.useState({});
  const [selectedTicketType, setSelectedTicketType] = React.useState({});
  useEffect(() => {
    console.log("selectedStatus updated", selectedStatus);
  }, [selectedStatus]);

  useEffect(() => {
    console.log("selectedTicketType updated", selectedTicketType);
  }, [selectedTicketType]);
  const handleStatusChange = (ticketId, status) => {
    setSelectedStatus((prevStatus) => ({ ...prevStatus, [ticketId]: status }));
  };

  const handleTicketTypeChange = (ticketId, ticketType) => {
    setSelectedTicketType((prevType) => ({
      ...prevType,
      [ticketId]: ticketType,
    }));
  };

  const handleStatusUpdate = async (ticketId) => {
    if (selectedStatus[ticketId] && selectedTicketType[ticketId]) {
      setIsUpdating((prev) => ({ ...prev, [ticketId]: true }));
      try {
        await dispatch(
          updateTicket({
            adminId,
            ticketId,
            status: selectedStatus[ticketId],
            ticketType: selectedTicketType[ticketId],
          })
        );
        dispatch(fetchAllTickets(adminId));
      } catch (error) {
        console.error("Failed to update ticket", error);
      } finally {
        setIsUpdating((prev) => ({ ...prev, [ticketId]: false }));
      }
    }
  };

  if (!tickets || tickets.length === 0) {
    return <p>No tickets yet.</p>;
  }

  return (
    <animated.div style={fade}>
      <Container fluid>
        <HeaderContainer className='px-3 py-3'>
          <h4>Tickets</h4>
        </HeaderContainer>
        {tickets.map((ticket) => {
          const date = new Date(ticket.createdAt).toISOString().slice(0, 10);
          return (
            <OrderCard key={ticket.id} className='p-3 mb-4'>
              <Row className='mb-3'>
                <Col md={4}>
                  <IconText>
                    <FaBox size={20} />
                    <h5>Ticket: {ticket.id}</h5>
                  </IconText>
                  <IconText>
                    <FaCalendarAlt size={20} />
                    <p>Date: {date}</p>
                  </IconText>
                </Col>
                <Col md={3}>
                  <StyledDropdown
                    onSelect={(status) => handleStatusChange(ticket.id, status)}
                    className='mb-2'
                  >
                    <h5>Status: {ticket.status}</h5>

                    <StyledDropdown.Toggle
                      variant='success'
                      id={`status-dropdown-${ticket.id}`}
                    >
                      {selectedStatus[ticket.id] || ticket.status}
                    </StyledDropdown.Toggle>

                    <StyledDropdown.Menu>
                      <Dropdown.Item eventKey='Open'>Open</Dropdown.Item>
                      <Dropdown.Item eventKey='Closed'>Closed</Dropdown.Item>
                      <Dropdown.Item eventKey='Spam'>Spam</Dropdown.Item>
                    </StyledDropdown.Menu>
                  </StyledDropdown>

                  <StyledDropdown
                    onSelect={(ticketType) =>
                      handleTicketTypeChange(ticket.id, ticketType)
                    }
                    className='mb-2'
                  >
                    <IconText>
                      <h5>Type: {t(ticket.ticket_type.name_key)}</h5>
                    </IconText>
                    <StyledDropdown.Toggle
                      variant='success'
                      id={`type-dropdown-${ticket.id}`}
                    >
                      {t(
                        selectedTicketType[ticket.id] ||
                          ticket.ticket_type.name_key
                      )}
                    </StyledDropdown.Toggle>

                    <StyledDropdown.Menu>
                      <Dropdown.Item eventKey='GeneralQuery'>
                        General query
                      </Dropdown.Item>
                      <Dropdown.Item eventKey='DeliveryIssue'>
                        Delivery issue
                      </Dropdown.Item>
                      <Dropdown.Item eventKey='ProductIssue'>
                        Product issue
                      </Dropdown.Item>
                      <Dropdown.Item eventKey='Spam'>Spam</Dropdown.Item>
                    </StyledDropdown.Menu>
                  </StyledDropdown>
                  <StyledButton
                    onClick={() => handleStatusUpdate(ticket.id)}
                    disabled={isUpdating[ticket.id]}
                    className='mb-2'
                  >
                    {isUpdating[ticket.id] ? (
                      <LoadingIndicator size='sm' animation='border' />
                    ) : (
                      "Update"
                    )}
                  </StyledButton>
                </Col>

                <Col md={4}>
                  <IconText>
                    <FaMoneyBill size={20} />
                    Description: <p>{ticket.description} </p>
                  </IconText>
                </Col>
              </Row>
              <Row className='mb-3'></Row>
              <Row>
                <Col md={3}>
                  <IconText>
                    <FaUserCircle size={20} />
                    <h6>Customer Details</h6>
                  </IconText>
                  Name: {ticket.customer.name}
                  <br />
                  Email: {ticket.customer.email}
                  <br />
                  Phone: {ticket.customer.phone}
                  <br />
                </Col>
              </Row>
            </OrderCard>
          );
        })}
      </Container>
    </animated.div>
  );
};

export default AdminSupportPage;

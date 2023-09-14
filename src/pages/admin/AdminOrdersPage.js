import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaBox,
  FaCalendarAlt,
  FaShoppingCart,
  FaTruck,
  FaCreditCard,
  FaMoneyBill,
} from "react-icons/fa";
import { useSpring, animated } from "react-spring";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useUser } from "@clerk/clerk-react";
import { BiLoaderCircle } from "react-icons/bi";
import { BsSignpost } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { BsHouseDoorFill } from "react-icons/bs";
import { FaShippingFast } from "react-icons/fa";
import { Dropdown, Button } from "react-bootstrap";
import { ImCancelCircle } from "react-icons/im";
import {
  HeaderContainer,
  OrderCard,
  IconText,
} from "../../styles/OrdersPageStyles";
import {
  StyledDropdown,
  StyledButton,
} from "../../styles/AdminOrdersPageStyles";
import { fetchAllOrders, updateOrderStatus } from "../../services/adminSlice";
import { verifyAdmin, getCurrencySymbol } from "../../utils/utils";
import LoadingIndicator from "../../components/LoadingIndicator";
const AdminOrdersPage = () => {
  const fade = useSpring({ from: { opacity: 0 }, opacity: 1 });
  const orders = useSelector((state) => state.admin.ordersItems);
  const dispatch = useDispatch();
  const { language } = useParams();
  const { t } = useTranslation();
  const { user } = useUser();
  const [isUpdating, setIsUpdating] = React.useState({});
  const adminId = user?.id;
  const navigate = useNavigate();
  useEffect(() => {
    if (!verifyAdmin(adminId)) {
      navigate(`/en/sign-in`);
    }
    dispatch(fetchAllOrders(adminId));
  }, [dispatch, user]);

  const [selectedStatus, setSelectedStatus] = React.useState({});

  const handleStatusChange = (orderId, status) => {
    setSelectedStatus((prevStatus) => ({ ...prevStatus, [orderId]: status }));
  };

  const handleStatusUpdate = async (orderId) => {
    if (selectedStatus[orderId]) {
      setIsUpdating((prev) => ({ ...prev, [orderId]: true }));
      try {
        await dispatch(
          updateOrderStatus({
            data: {
              adminId,
              orderId,
              status: selectedStatus[orderId],
            },
          })
        );
        dispatch(fetchAllOrders(adminId));
      } catch (error) {
        console.error("Failed to update order status", error);
      } finally {
        setIsUpdating((prev) => ({ ...prev, [orderId]: false }));
      }
    }
  };
  const getStatusIcon = (status) => {
    if (status === "Delivered") return <FaTruck />;
    if (status === "Paid") return <FaCreditCard />;
    if (status === "Sent") return <BsSignpost />;
    if (status === "processing") return <BiLoaderCircle />;
    if (status === "Canceled") return <ImCancelCircle />;
    return null;
  };

  if (!orders || orders.length === 0) {
    return <p>No orders yet.</p>;
  }
  console.log(orders);
  return (
    <animated.div style={fade}>
      <Container fluid>
        <HeaderContainer className='px-3 py-3'>
          <h4>Orders</h4>
        </HeaderContainer>
        {orders.map((order) => {
          const date = new Date(order.createdAt).toISOString().slice(0, 10);
          return (
            <OrderCard key={order.id} className='p-3 mb-4'>
              <Row className='mb-3'>
                <Col md={4}>
                  <IconText>
                    <FaBox size={20} />
                    <h5>Order: {order.id}</h5>
                  </IconText>
                  <IconText>
                    <FaCalendarAlt size={20} />
                    <p>Date: {date}</p>
                  </IconText>
                </Col>
                <Col md={3}>
                  <StyledDropdown
                    onSelect={(status) => handleStatusChange(order.id, status)}
                    className='mb-2'
                  >
                    <IconText>
                      {getStatusIcon(order.status)}
                      <h5>Status: {order.status}</h5>
                    </IconText>
                    <StyledDropdown.Toggle
                      variant='success'
                      id='dropdown-basic'
                    >
                      Change Status
                    </StyledDropdown.Toggle>

                    <StyledDropdown.Menu>
                      <Dropdown.Item eventKey='processing'>
                        Processing
                      </Dropdown.Item>
                      <Dropdown.Item eventKey='Sent'>Sent</Dropdown.Item>
                      <Dropdown.Item eventKey='Delivered'>
                        Delivered
                      </Dropdown.Item>
                      <Dropdown.Item eventKey='Paid'>Paid</Dropdown.Item>
                      <Dropdown.Item eventKey='Canceled'>
                        Canceled
                      </Dropdown.Item>
                    </StyledDropdown.Menu>
                  </StyledDropdown>
                  <StyledButton
                    onClick={() => handleStatusUpdate(order.id)}
                    disabled={isUpdating[order.id]}
                    className='mb-2'
                  >
                    {isUpdating[order.id] ? (
                      <LoadingIndicator size='sm' animation='border' />
                    ) : (
                      "Update"
                    )}
                  </StyledButton>
                </Col>
                <Col md={4}>
                  <IconText>
                    <FaMoneyBill size={20} />
                    <h5>
                      Total: {order.total}{" "}
                      {getCurrencySymbol(order.currency_id)}
                    </h5>
                  </IconText>
                </Col>
              </Row>
              <Row className='mb-3'>
                <Col>
                  <IconText>
                    <FaShoppingCart size={20} />
                    <h6>Items:</h6>
                  </IconText>
                  <ul>
                    {order.ordersitems.map((item) => (
                      <li key={item.id}>
                        {t(item.product.name_key)} (x{item.quantity})
                      </li>
                    ))}
                  </ul>
                </Col>
              </Row>
              <Row>
                <Col md={3}>
                  <IconText>
                    <FaUserCircle size={20} />
                    <h6>Customer Details</h6>
                  </IconText>
                  Email: {order.customer.email}
                  <br />
                  Phone: {order.customer.phone}
                </Col>
                <Col md={3}>
                  <IconText>
                    <BsHouseDoorFill size={20} />
                    <h6>Billing Address</h6>
                  </IconText>
                  {order.customer.real_name}
                  <br />
                  {`${order.billing_address.street} ${order.billing_address.num}`}
                  <br />
                  {`${order.billing_address.city}`}
                  <br />
                  {`${order.billing_address.state}, ${order.billing_address.country}`}
                  <br />
                  {`${order.billing_address.zip}`}
                </Col>
                <Col md={3}>
                  <IconText>
                    <FaShippingFast size={20} />
                    <h6>Shipping Address</h6>
                  </IconText>
                  {`${order.billing_address.city}`}
                  <br />
                  {`${order.billing_address.state}, ${order.billing_address.country}`}
                  <br />
                  {`${order.billing_address.zip}`}
                </Col>
                <Col md={2}>
                  <IconText>
                    <BiLoaderCircle size={20} />
                    <h5>Tax Number: {order.tax_number ?? "N/A"}</h5>
                  </IconText>
                </Col>
              </Row>
            </OrderCard>
          );
        })}
      </Container>
    </animated.div>
  );
};

export default AdminOrdersPage;

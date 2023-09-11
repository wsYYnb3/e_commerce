import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaBox,
  FaCalendarAlt,
  FaShoppingCart,
  FaDollarSign,
  FaTruck,
  FaCreditCard,
} from "react-icons/fa";
import { useSpring, animated } from "react-spring";
import {
  HeaderContainer,
  OrderCard,
  IconText,
} from "../styles/OrdersPageStyles";

const OrdersPage = () => {
  const fade = useSpring({ from: { opacity: 0 }, opacity: 1 });

  // Mock data for the orders
  const orders = [
    {
      orderNumber: "123456",
      orderDate: "08/01/2023",
      total: "$150",
      items: [
        { name: "Item 1", quantity: 2 },
        { name: "Item 2", quantity: 1 },
      ],
      status: "Delivered",
    },
    {
      orderNumber: "123457",
      orderDate: "08/05/2023",
      total: "$75",
      items: [{ name: "Item 3", quantity: 1 }],
      status: "Paid",
    },
  ];
  const getStatusIcon = (status) => {
    if (status === "Delivered") return <FaTruck />;
    if (status === "Paid") return <FaCreditCard />;
    return null;
  };

  return (
    <animated.div style={fade}>
      <Container fluid>
        <HeaderContainer className='px-3 py-3'>
          <h4>Your Orders</h4>
        </HeaderContainer>
        {orders.map((order, index) => (
          <OrderCard key={index}>
            <Row>
              <Col md={4}>
                <IconText>
                  <FaBox />
                  <h5>Order: {order.orderNumber}</h5>
                </IconText>
                <IconText>
                  <FaCalendarAlt />
                  <p>Date: {order.orderDate}</p>
                </IconText>
              </Col>
              <Col md={4}>
                <IconText>
                  <FaShoppingCart />
                  <h6>Items:</h6>
                </IconText>
                <ul>
                  {order.items.map((item, idx) => (
                    <li key={idx}>
                      {item.name} (x{item.quantity})
                    </li>
                  ))}
                </ul>
              </Col>
              <Col md={4}>
                <IconText>
                  <FaDollarSign />
                  <h5>Total: {order.total}</h5>
                </IconText>
                <IconText>
                  {getStatusIcon(order.status)}
                  <h5>Status: {order.status}</h5>
                </IconText>
              </Col>
            </Row>
          </OrderCard>
        ))}
      </Container>
    </animated.div>
  );
};

export default OrdersPage;

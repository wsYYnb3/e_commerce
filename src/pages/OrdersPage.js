import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const OrderCard = styled(Card)`
  margin: 15px 0;
  padding: 15px;
`;

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
    },
    {
      orderNumber: "123457",
      orderDate: "08/05/2023",
      total: "$75",
      items: [{ name: "Item 3", quantity: 1 }],
    },
  ];

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
                <h5>Order Number: {order.orderNumber}</h5>
                <p>Order Date: {order.orderDate}</p>
              </Col>
              <Col md={4}>
                <h6>Items:</h6>
                <ul>
                  {order.items.map((item, idx) => (
                    <li key={idx}>
                      {item.name} (x{item.quantity})
                    </li>
                  ))}
                </ul>
              </Col>
              <Col md={4}>
                <h5>Total: {order.total}</h5>
              </Col>
            </Row>
          </OrderCard>
        ))}
      </Container>
    </animated.div>
  );
};

export default OrdersPage;

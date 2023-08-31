import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import {
  FaBox,
  FaCalendarAlt,
  FaShoppingCart,
  FaDollarSign,
  FaTruck,
  FaCreditCard,
} from "react-icons/fa";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const OrderCard = styled(Card)`
  margin: 15px 0;
  padding: 15px;
`;

export const IconText = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  h5,
  h6,
  p {
    margin: 0;
  }
`;

import React from "react";
import {
  Container,
  Row,
  Col,
  Button,
  ListGroup,
  Image,
  Card,
  Form,
} from "react-bootstrap";
import { FaTrash, FaShoppingCart } from "react-icons/fa";
import styled from "styled-components";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, adjustQuantity } from "../services/cartSlice";
import { useTranslation } from "react-i18next";
import {
  getDisplayPrice,
  getCurrencyDetails,
  calculateSubtotal,
  formatPrice,
} from "../utils/utils";
export const StyledWrapper = styled.div`
  background-color: #f4f4f4;
  min-height: 100vh;
  padding: 50px 0;
`;

export const StyledCard = styled(Card)`
  background-color: #ffdb59;
  color: #333;
`;

export const StyledListGroupItem = styled(ListGroup.Item)`
  background-color: #f7f7f7;
`;

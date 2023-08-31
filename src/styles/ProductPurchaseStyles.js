import React from "react";
import { Button, FormControl } from "react-bootstrap";
import { FaShoppingCart, FaMinus, FaPlus } from "react-icons/fa";
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, adjustQuantity } from "../services/cartSlice";
import {
  getCurrencyDetails,
  getDisplayPrice,
  formatPrice,
} from "../utils/utils";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const StyledContainer = styled.div`
  margin-top: 20px;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
`;

export const QuantityWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledButton = styled(Button)`
  margin-top: 0;
  margin-left: auto;
  display: block;
`;

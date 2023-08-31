import React, { useState, useEffect, useContext, useCallback } from "react";
import {
  Card,
  Button,
  Col,
  Row,
  Container,
  Form,
  FormControl,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { FaShoppingCart, FaMinus, FaPlus } from "react-icons/fa";
import { useSpring, animated } from "react-spring";
import ProductDetail from "../components/ProductDetail";
//import ProductSpecification from '../components/ProductSpecification';
//import FarmerProfile from '../components/FarmerProfile';
//import FarmInformation from '../components/FarmInformation';
//import TechnicalInformation from '../components/TechnicalInformation';
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductById,
  fetchProducts,
  getProduct,
} from "../services/itemsSlice";
import TechnicalInfo from "../components/TechnicalInfo";
import Description from "../components/Description";
import ProductPurchase from "../components/ProductPurchase";
import ImageGallery from "../components/ImageGallery";
import image1 from "../images/product1.webp";
import image2 from "../images/product2.jpg";
import Keywords from "../components/Keywords";
import { useTranslation } from "react-i18next";
import {
  getCurrencyDetails,
  getDisplayPrice,
  formatPrice,
} from "../utils/utils";
export const StyledCol = styled(Col)`
  margin-bottom: 30px;

  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`;

export const StyledImageCol = styled(Col)`
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const ProductPageContainer = styled(Container)`
  padding: 20px;
`;

export const DescriptionTechnicalInfoContainer = styled.div`
  @media (min-width: 768px) {
    margin-left: 30px;
  }
`;

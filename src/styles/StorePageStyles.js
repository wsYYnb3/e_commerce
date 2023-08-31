import React, { useState, useEffect } from "react";
import { Container, Row, Col, Dropdown, Form } from "react-bootstrap";
import { FaSortAmountDownAlt, FaBars } from "react-icons/fa";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";
import {
  SideBar,
  SearchBox,
  SearchIcon,
  ProductRow,
} from "../styles/StoreStyles";
import Sidebar from "../components/Sidebar";
import ProductList from "../components/ProductList";
import SortDropdown from "../components/SortDropdown";
import { useDispatch, useSelector } from "react-redux";
import { sortItems } from "../services/itemsSlice";
import {
  fetchProducts,
  fetchNewestProducts,
  getFiveNewestProducts,
} from "../services/itemsSlice";
import { Link, useParams } from "react-router-dom";
import {
  getDisplayPrice,
  getCurrencyDetails,
  calculateSubtotal,
  formatPrice,
  getComparisonFunction,
} from "../utils/utils";
import { useTranslation } from "react-i18next";
import { fetchCategories, selectCategories } from "../services/categoriesSlice";
const categories = [
  "Category 1",
  "Category 2",
  "Category 3",
  "Category 4",
  "Category 5",
];
export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
`;

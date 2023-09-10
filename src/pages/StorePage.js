import React, { useState, useEffect } from "react";
import { Container, Row, Col, Dropdown, Form } from "react-bootstrap";
import { FaSortAmountDownAlt, FaBars } from "react-icons/fa";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  SideBar,
  SearchBox,
  SearchIcon,
  ProductRow,
} from "../styles/StoreStyles";
import Sidebar from "../components/Sidebar";
import ProductList from "../components/ProductList";
import SortDropdown from "../components/SortDropdown";
import { sortItems } from "../services/itemsSlice";
import {
  fetchProducts,
  fetchNewestProducts,
  getFiveNewestProducts,
} from "../services/itemsSlice";
import {
  getDisplayPrice,
  getCurrencyDetails,
  calculateSubtotal,
  formatPrice,
  getComparisonFunction,
} from "../utils/utils";
import { fetchCategories, selectCategories } from "../services/categoriesSlice";
import { HeaderContainer, Actions } from "../styles/StorePageStyles";

const StorePage = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const products = useSelector((state) => state.items);
  const dispatch = useDispatch();
  const fade = useSpring({ from: { opacity: 0 }, opacity: 1 });
  const { language } = useParams();
  const { t } = useTranslation();
  const categories = useSelector(selectCategories);

  useEffect(() => {
    dispatch(fetchProducts())
      .then((response) => {})
      .catch((error) => {
        console.error("Failed to fetch products:", error);
      });
    dispatch(fetchCategories())
      .then((response) => {})
      .catch((error) => {
        console.error("Failed to fetch categories:", error);
      });
  }, [dispatch]);

  const handleSortSelect = (sortKey) => {
    const { currencyId } = getCurrencyDetails(language);
    const comparisonFunction = getComparisonFunction(sortKey, currencyId, t);

    const sortedItems = [...products.items].sort(comparisonFunction);

    dispatch(sortItems(sortedItems));
  };

  return (
    <animated.div style={fade}>
      <Container fluid>
        <Row>
          <Col xs={12} lg={2}>
            {isSidebarOpen && (
              <SideBar>
                <SearchBox>
                  <SearchIcon />
                  <Form.Control type='search' placeholder='Search' />
                </SearchBox>
                <Sidebar
                  categories={categories}
                  selectedCategories={selectedCategories}
                  setSelectedCategories={setSelectedCategories}
                />
              </SideBar>
            )}
          </Col>

          <Col xs={12} lg={10}>
            <HeaderContainer className='px-3'>
              <h4>Our Products</h4>
              <Actions>
                <FaBars
                  onClick={() => setSidebarOpen(!isSidebarOpen)}
                  style={{ cursor: "pointer", marginRight: "10px" }}
                />
                <SortDropdown onSelect={handleSortSelect} />
              </Actions>
            </HeaderContainer>
            <ProductRow>
              <ProductList
                selectedCategories={selectedCategories}
                items={products.items}
              />
            </ProductRow>
          </Col>
        </Row>
      </Container>
    </animated.div>
  );
};

export default StorePage;

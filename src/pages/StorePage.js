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
import { fetchProducts } from "../services/itemsSlice";
import { Link, useParams } from "react-router-dom";

const categories = [
  "Category 1",
  "Category 2",
  "Category 3",
  "Category 4",
  "Category 5",
];
const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
`;
const StorePage = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const products = useSelector((state) => state.items);
  const dispatch = useDispatch();
  const fade = useSpring({ from: { opacity: 0 }, opacity: 1 });
  const { language } = useParams();

  useEffect(() => {
    dispatch(fetchProducts(language))
      .then((response) => {})
      .catch((error) => {
        console.error("Failed to fetch products:", error);
      });
  }, [language, dispatch]);

  const handleSortSelect = (sortKey) => {
    let sortOrder = "asc";
    let property = sortKey;

    if (sortKey === "low") {
      property = "price";
      sortOrder = "asc";
    } else if (sortKey === "high") {
      property = "price";
      sortOrder = "desc";
    } else if (sortKey === "name") {
      property = "name";
      sortOrder = "asc";
    } else if (sortKey === "newest") {
      property = "date_added";
      sortOrder = "desc";
    }
    dispatch(sortItems({ property, order: sortOrder }));
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

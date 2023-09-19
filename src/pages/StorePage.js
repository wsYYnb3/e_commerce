import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { FaBars } from "react-icons/fa";
import { useSpring, animated } from "react-spring";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { fetchSearchResults } from "../services/itemsSlice";
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
import { fetchProducts } from "../services/itemsSlice";
import { getCurrencyDetails, getComparisonFunction } from "../utils/utils";
import { fetchCategories, selectCategories } from "../services/categoriesSlice";
import {
  HeaderContainer,
  Actions,
  StyledResetButton,
} from "../styles/StorePageStyles";
import LoadingIndicator from "../components/LoadingIndicator";

const StorePage = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const products = useSelector((state) => state.items);
  const dispatch = useDispatch();
  const fade = useSpring({ from: { opacity: 0 }, opacity: 1 });
  const { language, categoryId } = useParams();
  const { t } = useTranslation();
  const categories = useSelector(selectCategories);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
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
  }, [dispatch, language]);

  useEffect(() => {
    if (categories && categoryId) {
      const selectedCategory = categories.find(
        (category) => category.id === parseInt(categoryId, 10)
      );

      if (selectedCategory) {
        setSelectedCategories([selectedCategory]);
      }
    }
  }, [categories, categoryId]);
  const handleSortSelect = (sortKey) => {
    const { currencyId } = getCurrencyDetails(language);
    const comparisonFunction = getComparisonFunction(sortKey, currencyId, t);

    const sortedItems = [...products.items].sort(comparisonFunction);

    dispatch(sortItems(sortedItems));
  };

  const handleSearch = () => {
    if (query.trim()) {
      setLoading(true);
      setError(null);
      setHasSearched(true);

      dispatch(fetchSearchResults({ query, language }))
        .then((response) => {
          setLoading(false);
        })
        .catch((error) => {
          console.error("Failed to fetch search results:", error);
          setLoading(false);
          setError("No search results found.");
        });
    } else {
      setHasSearched(false);
    }
  };

  if (loading) {
    return <LoadingIndicator />;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <animated.div style={fade}>
      <Container fluid>
        <Row>
          <Col xs={12} lg={2}>
            {isSidebarOpen && (
              <SideBar>
                <SearchBox>
                  <SearchIcon onClick={handleSearch} />
                  <Form.Control
                    type='search'
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                    }}
                    placeholder='Search'
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSearch();
                        e.preventDefault();
                      }
                    }}
                  />
                </SearchBox>
                <Sidebar
                  categories={categories}
                  selectedCategories={selectedCategories}
                  setSelectedCategories={setSelectedCategories}
                />
              </SideBar>
            )}
          </Col>

          <Col xs={12} lg={10} className='justify-content-center'>
            <HeaderContainer className='px-3'>
              <h4>Our Products</h4>

              <Actions>
                <FaBars
                  onClick={() => setSidebarOpen(!isSidebarOpen)}
                  style={{ cursor: "pointer", marginRight: "10px" }}
                />
                <SortDropdown onSelect={handleSortSelect} />
                {hasSearched && (
                  <StyledResetButton onClick={() => setHasSearched(false)}>
                    Reset Search
                  </StyledResetButton>
                )}
              </Actions>
            </HeaderContainer>
            <ProductRow>
              <ProductList
                selectedCategories={selectedCategories}
                items={hasSearched ? products.searchResults : products.items}
              />
            </ProductRow>
          </Col>
        </Row>
      </Container>
    </animated.div>
  );
};

export default StorePage;

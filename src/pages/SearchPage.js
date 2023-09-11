import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { fetchSearchResults, sortSearch } from "../services/itemsSlice";
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Dropdown, Form } from "react-bootstrap";
import { FaSortAmountDownAlt, FaBars } from "react-icons/fa";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
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
import LoadingIndicator from "../components/LoadingIndicator";

const StyledSearchIcon = styled(FontAwesomeIcon)`
  margin-right: 10px;
  color: #555;
`;

const SearchBar = styled.div`
  position: relative;
  width: 100%;

  .react-autosuggest__input {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
    border: 2px solid #555;
    border-radius: 4px;
  }
`;

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const searchResults = useSelector((state) => state.items.searchResults);
  const { language } = useParams();
  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get("q");
  const params = { query: query, language: language };
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const products = useSelector((state) => state.items);
  const dispatch = useDispatch();
  const fade = useSpring({ from: { opacity: 0 }, opacity: 1 });
  const { t } = useTranslation();
  const categories = useSelector(selectCategories);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (queryParam) {
      setQuery(queryParam);
    }

    setLoading(true);
    setError(null);

    dispatch(fetchSearchResults({ query: queryParam || "", language }))
      .then((response) => {
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch products:", error);
        setLoading(false);
        console.log("here");
        setError("No search results found.");
      });
    dispatch(fetchCategories())
      .then((response) => {})
      .catch((error) => {
        console.error("Failed to fetch categories:", error);
      });
  }, [dispatch, language, queryParam]);

  const handleSortSelect = (sortKey) => {
    console.log("Before sorting", searchResults);
    const { currencyId } = getCurrencyDetails(language);
    const comparisonFunction = getComparisonFunction(sortKey, currencyId, t);

    const sortedItems = [...searchResults].sort(comparisonFunction);
    console.log("After sorting", sortedItems);
    dispatch(sortSearch(sortedItems));
  };

  const handleSearch = () => {
    if (query.trim()) {
      dispatch(fetchSearchResults(params));
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
        <Row className='justify-content-center'>
          <Col md={6}>
            <SearchBar>
              <Form.Control
                type='text'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder='Search for products...'
                className='react-autosuggest__input'
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                    e.preventDefault();
                  }
                }}
              />
              <StyledSearchIcon
                icon={faSearch}
                onClick={handleSearch}
                style={{
                  position: "absolute",
                  top: "15px",
                  right: "20px",
                  cursor: "pointer",
                }}
              />
            </SearchBar>
          </Col>
        </Row>
        <Row className='justify-content-center'>
          <Col xs={12} lg={10}>
            <HeaderContainer className='px-3'>
              <h4>Search Results</h4>
              <Actions>
                <SortDropdown onSelect={handleSortSelect} />
              </Actions>
            </HeaderContainer>
            <ProductRow>
              <ProductList
                selectedCategories={selectedCategories}
                items={searchResults}
              />
            </ProductRow>
          </Col>
        </Row>
      </Container>
    </animated.div>
  );
};

export default SearchPage;

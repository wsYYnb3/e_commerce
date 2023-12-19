import { faSearch } from "@fortawesome/free-solid-svg-icons";

import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { useSpring, animated } from "react-spring";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

import { ProductRow } from "../styles/StoreStyles";
import ProductList from "../components/ProductList";
import SortDropdown from "../components/SortDropdown";
import { getCurrencyDetails, getComparisonFunction } from "../utils/utils";
import { fetchCategories } from "../services/categoriesSlice";
import { HeaderContainer, Actions } from "../styles/StorePageStyles";
import LoadingIndicator from "../components/LoadingIndicator";
import { fetchSearchResults, sortSearch } from "../services/itemsSlice";
import { StyledSearchIcon, SearchBar } from "../styles/SearchPageStyles";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const searchResults = useSelector((state) => state.items.searchResults);
  const { language } = useParams();
  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get("q");
  const params = { query: query, language: language };

  const [selectedCategories] = useState([]);

  const dispatch = useDispatch();
  const fade = useSpring({ from: { opacity: 0 }, opacity: 1 });
  const { t } = useTranslation();

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
        setError("No search results found.");
      });
    dispatch(fetchCategories())
      .then((response) => {})
      .catch((error) => {
        console.error("Failed to fetch categories:", error);
      });
  }, [dispatch, language, queryParam]);

  const handleSortSelect = (sortKey) => {
    const { currencyId } = getCurrencyDetails(language);
    const comparisonFunction = getComparisonFunction(sortKey, currencyId, t);

    const sortedItems = [...searchResults].sort(comparisonFunction);

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

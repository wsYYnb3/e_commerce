import React, { useState, useEffect } from "react";
import Autosuggest from "react-autosuggest";
import { debounce } from "lodash";
import { Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { InputGroup } from "react-bootstrap";
const mockProducts = [
  {
    id: 1,
    name: "Organic Apple",
    category: "Fruits",
    keywords: ["Organic", "Fresh", "Apple"],
  },
  {
    id: 2,
    name: "Fresh Orange Juice",
    category: "Beverages",
    keywords: ["Organic", "Juice", "Orange"],
  },
  {
    id: 3,
    name: "Organic Banana",
    category: "Fruits",
    keywords: ["Organic", "Fresh", "Banana"],
  },
  {
    id: 4,
    name: "Green Tea",
    category: "Beverages",
    keywords: ["Tea", "Green"],
  },
  {
    id: 5,
    name: "Grilled Chicken",
    category: "Meat",
    keywords: ["Chicken", "Grilled", "Organic"],
  },
  {
    id: 6,
    name: "Whole Wheat Bread",
    category: "Bakery",
    keywords: ["Bread", "Wheat", "Organic"],
  },
  {
    id: 7,
    name: "Natural Honey",
    category: "Sweeteners",
    keywords: ["Natural", "Honey", "Organic"],
  },
];

const StyledContainer = styled(Container)`
  padding-top: 50px;
  .react-autosuggest__input {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
    border: 2px solid #555;
    border-radius: 4px;
  }
`;

const StyledSearchIcon = styled(FontAwesomeIcon)`
  margin-right: 10px;
`;

const getSuggestions = (value) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : mockProducts.filter(
        (prod) =>
          prod.name.toLowerCase().includes(inputValue) ||
          prod.category.toLowerCase().includes(inputValue) ||
          prod.keywords.some((k) => k.toLowerCase().includes(inputValue))
      );
};

const SearchPage = () => {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const onChange = (event, { newValue }) => {
    setValue(newValue);
  };

  const onSuggestionsFetchRequested = debounce(({ value }) => {
    setSuggestions(getSuggestions(value));
  }, 300);

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const getSuggestionValue = (suggestion) => suggestion.name;

  const renderSuggestion = (suggestion) => (
    <div>
      <StyledSearchIcon icon={faSearch} />
      {suggestion.name}
    </div>
  );

  const inputProps = {
    placeholder: "Search for products...",
    value,
    onChange: onChange,
  };

  return (
    <StyledContainer>
      <Row className='justify-content-center'>
        <Col md={6}>
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
          />
        </Col>
      </Row>
    </StyledContainer>
  );
};

export default SearchPage;

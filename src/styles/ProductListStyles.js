import { Card, Button } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import styled from "styled-components";
export const CardContainer = styled.div`
  position: relative;
  margin-bottom: 4px;
  cursor: pointer;

  &:hover {
    transform: scale(1.02);
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const StyledStar = styled(FaStar)`
  position: absolute;
  top: 10px;
  right: 10px;
  color: ${(props) => (props.favorite ? "gold" : "gray")};
  cursor: pointer;
  z-index: 2;
  font-size: 24px;

  &:hover {
    color: gold;
  }
`;

export const StyledFooter = styled(Card.Footer)`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  text-align: left;

  .product-price {
    display: flex;
    justify-content: space-between;
  }
`;

export const StyledCard = styled(Card)`
  &:hover {
    transform: scale(1.02);
  }
`;
export const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;

  &:hover {
    color: inherit;
    text-decoration: none;
  }
`;
export const StyledButton = styled(Button)`
  width: 80%;
  margin: 1rem auto 0;
  margin-bottom: 4px;
  display: block;
  background-color: #40a798;
  border: none;
  color: white;
  transition: background-color 0.3s ease;

  &:hover,
  &:focus {
    background-color: #455a64;
    color: white;
  }

  &:active {
    background-color: #303f9f;
    color: white;
  }

  .fa-shopping-cart {
    margin-right: 0.5rem;
  }
`;

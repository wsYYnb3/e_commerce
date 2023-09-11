import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import styled from "styled-components";
import "react-multi-carousel/lib/styles.css";
export const ProductItem = styled.div`
  min-height: 350px; // Adjust this to your liking
  width: 300px;
  text-align: center;
  background-color: #f8f9fa;
  border-radius: 10px;
  margin: 10px 5px; // Provide equal vertical and horizontal margins
  padding: 10px;
  box-shadow: 0px 0px 10px #ccc;

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
`;

export const StyledCard = styled(Card)`
  text-align: center;
  color: inherit;
  text-decoration: none;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  &:hover {
    transform: scale(1.02);
    transition: transform 0.2s;
  }
`;
export const StyledProductName = styled.div`
  background-color: rgba(
    255,
    255,
    255,
    0.8
  ); // Semi-transparent white background
  padding: 8px; // Padding around text
  border-radius: 16px; // Rounded corners
  margin: 4px; // Margin around the element
`;

export const StyledProductPrice = styled.div`
  background-color: rgba(0, 0, 0, 0.8); // Semi-transparent black background
  color: #fff; // White text
  padding: 8px; // Padding around text
  border-radius: 16px; // Rounded corners
  margin: 4px; // Margin around the element
`;
export const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  &:hover {
    color: inherit;
    text-decoration: none;
  }
`;
export const StyledBanner = styled(Link)`
  display: block;
  max-width: 100%;
  margin: 5px auto;
  box-shadow: 0px 0px 10px #ccc;

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 10px;
  }
`;

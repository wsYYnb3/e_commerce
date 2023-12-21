import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import styled from "styled-components";
import "react-multi-carousel/lib/styles.css";

export const CarouselCard = styled.div`
  height: 30rem;
  img {
    width: 100%;
    height: 20rem;
    object-fit: cover;
  }
`;
export const ProductItem = styled.div`
  height: 25rem;
  width: 300px;
  text-align: center;
  background-color: #f8f9fa;
  border-radius: 10px;
  margin: 10px 5px;
  padding: 10px;
  box-shadow: 0px 0px 10px #ccc;

  img {
    width: 100%;
    height: 70%;
    object-fit: cover;
  }
`;

export const StyledCard = styled(Card)`
  text-align: center;
  color: inherit;
  text-decoration: none;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  margin-bottom: 2em;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  }

  .icon-container {
    width: 60px;
    height: 60px;
    margin-bottom: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background: #f8f9fa;
    overflow: hidden;
    margin-left: 1.1rem;
  }

  .icon-container img {
    width: 80%;
    height: 80%;
    object-fit: contain;
    margin: auto;
  }

  .title {
    font-size: 1.1em;
    margin: 0;
    font-weight: 500;
    color: #333;
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
    height: 15rem;
    object-fit: cover;
    border-radius: 10px;
  }
`;

import React from "react";
import { Col, Card, Button } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, setCart } from "../services/cartSlice";

const products = [
  {
    id: 1,
    name: "Product 1",
    image: "https://via.placeholder.com/150",
    price: 100,
    category: "Category 1",
    manufacturer: "Lorem",
    unit: "250 g",
    origin: "HU",
  },
  {
    id: 2,
    name: "Product 2",
    image: "https://via.placeholder.com/150",
    price: 200,
    category: "Category 2",
    manufacturer: "Ipsum",
    unit: "1 litre",
    origin: "IL",
  },
  {
    id: 3,
    name: "Product 3",
    image: "https://via.placeholder.com/150",
    price: 300,
    category: "Category 3",
    manufacturer: "Sub",
    unit: "0.6 kg",
    origin: "US",
  },
];

const StyledCard = styled(Card)`
  &:hover {
    transform: scale(1.02);
  }
`;

const StyledButton = styled(Button)`
  width: 80%;
  margin: 1rem auto 0;
  margin-bottom: 4px;
  display: block;
  background-color: #607d8b;
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
const StyledFooter = styled(Card.Footer)`
  color: black; // or any color you want
  display: flex;
  justify-content: space-between;
`;
const ProductList = ({ selectedCategories }) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const handleAddToCart = (product) => {
    const productWithQuantity = { ...product, quantity: 1 };
    dispatch(addToCart(productWithQuantity));
    toast.success("Product added to cart!", { position: "top-right" });
  };

  const filteredProducts =
    selectedCategories.length > 0
      ? products.filter((product) =>
          selectedCategories.includes(product.category)
        )
      : products;

  if (filteredProducts.length === 0) {
    return <p>No products found for the selected categories.</p>;
  }

  return filteredProducts.map((product) => (
    <Col xs={12} sm={6} md={4} lg={3} key={product.id} className='mb-4'>
      <StyledCard>
        <Link to={`/product/${product.id}`}>
          <Card.Img variant='top' src={product.image} />
          <Card.Body>
            <Card.Title>{product.name}</Card.Title>
            <Card.Text></Card.Text>
            <Card.Text>
              {product.manufacturer}
              <br />
              {product.origin}
            </Card.Text>
          </Card.Body>
        </Link>
        <StyledFooter>
          <b>{product.price}$</b>

          {product.unit}
        </StyledFooter>
        <StyledButton
          variant='primary'
          size='sm'
          onClick={(e) => handleAddToCart(product)}
        >
          <FaShoppingCart /> Add to Cart
        </StyledButton>
      </StyledCard>
    </Col>
  ));
};

export default ProductList;

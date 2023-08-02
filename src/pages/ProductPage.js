import React, { useState, useEffect } from 'react';
import { Card, Button, Col, Row, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import { FaShoppingCart } from 'react-icons/fa';

const StyledCard = styled(Card)`
    width: 100%;
  object-fit: cover;
  @media (min-width: 1025px) {
    height: 255px;
    width : 452px;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    height: 400px;  
    height: 255px;
  }

  @media (max-width: 767px) {
    height: 265px;
    width: 370px;
  &:hover {
    transform: scale(1.02);
    transition: transform .2s;
  }
`;

const StyledImage = styled.img`
  width: 100%;
  object-fit: cover;
  @media (min-width: 1025px) {
    height: 555px;
    width : 452px;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    height: 400px;  // Adjust this as per your requirement for iPad
  }

  @media (max-width: 767px) {
    height: 265px;
    width: 370px;
  }
`;

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const fade = useSpring({ from: { opacity: 0 }, opacity: 1 });

  useEffect(() => {
    const fetchedProduct = {
      id: id,
      name: 'Product 1',
      image: 'https://via.placeholder.com/150',
      description: 'This is a great product!',
      price: 100,
    };

    setProduct(fetchedProduct);
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <animated.div style={fade}>
      <Container>
        <Row>
          <Col md={6}>
            <StyledImage src={product.image} alt={product.name}/>
          </Col>
          <Col md={6}>
            <StyledCard>
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <Card.Text>
                  Price: ${product.price}
                </Card.Text>
                <Button variant="primary" size="sm">
                  <FaShoppingCart /> Add to Cart
                </Button>
              </Card.Body>
            </StyledCard>
          </Col>
        </Row>
      </Container>
    </animated.div>
  );
};

export default ProductPage;

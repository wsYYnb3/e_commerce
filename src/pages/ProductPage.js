import React, { useState, useEffect } from 'react';
import { Card, Button, Col, Row, Container, Form, FormControl } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import { FaShoppingCart, FaMinus, FaPlus } from 'react-icons/fa';

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
    const [quantity, setQuantity] = useState(1);
    const [totalPrice, setTotalPrice] = useState(null);
    const fade = useSpring({ from: { opacity: 0 }, opacity: 1 });
  
    useEffect(() => {
      const fetchProduct = async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
    
        const fetchedProduct = {
          id: id,
          name: 'Product 1',
          image: 'https://via.placeholder.com/150',
          description: 'This is a great product!',
          price: 100,
          unitOfMeasure: 'kg',
          manufacturer: {
            id: 1,
            name: "Manufacturer 1",
            country: 'us', // country_key
            address: "123 Fake St",
            contact_details: "123-456-7890"
          },
          // ...other properties
        };
    
        setProduct(fetchedProduct);
        setTotalPrice(fetchedProduct.price);
      }
    
      fetchProduct();
    }, [id]);
  
    useEffect(() => {
      if(product) {
        setTotalPrice(quantity * product.price);
      }
    }, [quantity, product]);
  
    const increaseQuantity = () => setQuantity(prevQuantity => prevQuantity + 1);
    const decreaseQuantity = () => setQuantity(prevQuantity => prevQuantity > 1 ? prevQuantity - 1 : 1);
  
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
                    Price: ${product.price}/{product.unitOfMeasure}
                  </Card.Text>
                  <Card.Text>
                    Manufacturer: {product.manufacturer.name}
                  </Card.Text>
                  <Card.Text>
                    Country of Origin: {product.manufacturer.country} {/* Assuming country_key needs to be translated to actual country name */}
                  </Card.Text>
                  <div className="d-flex align-items-center">
                    <FaMinus onClick={decreaseQuantity}/>
                    <FormControl type="number" value={quantity} readOnly className="mx-2 text-center" style={{width: '60px'}}/>
                    <FaPlus onClick={increaseQuantity}/>
                  </div>
                  <Card.Text className="mt-3">
                    Total: ${totalPrice}
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

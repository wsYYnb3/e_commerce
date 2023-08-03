import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Dropdown } from 'react-bootstrap';
import { FaSearch, FaSortAmountDownAlt, FaShoppingCart, FaStar, FaListUl } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { useSpring, animated } from 'react-spring';

import { SideBar, SearchBox, SearchIcon, StyledCard, ProductRow, Star, RadioLabel, radioHighlight } from '../styles/StoreStyles';
const categories = ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5'];
const products = [
  { id: 1, name: 'Product 1', image: 'https://via.placeholder.com/150', price: 100 },
  { id: 2, name: 'Product 2', image: 'https://via.placeholder.com/150', price: 200 },
  { id: 3, name: 'Product 3', image: 'https://via.placeholder.com/150', price: 300 },
];



const StorePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const fade = useSpring({ from: { opacity: 0 }, opacity: 1 });
  const highlight = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 500 },
    reset: true
  });

  return (
    <animated.div style={fade}>
      <Container fluid>
        <Row>
          <Col xs={12} lg={2}>
            <SideBar>
              <SearchBox>
                <SearchIcon />
                <Form.Control type="search" placeholder="Search" />
              </SearchBox>
              <h5>Categories</h5>
              {categories.map((category, index) => (
                <div key={index}>
                  <Form.Check 
                    type="radio"
                    id={`category-${index}`}
                    label={
                      <RadioLabel 
                        style={selectedCategory === category ? highlight : {}} 
                        css={selectedCategory === category ? { animation: `${radioHighlight} 0.5s forwards` } : {}}
                      >
                        <FaListUl className="mr-2" /> {category}
                      </RadioLabel>
                    }
                    checked={selectedCategory === category}
                    onChange={() => setSelectedCategory(category)}
                  />
                </div>
              ))}
            </SideBar>
          </Col>

         
          <Col xs={12} lg={10}>
            <Row className="justify-content-between align-items-center px-3">
              <h4>Our Products</h4>
              <Dropdown onSelect={(e) => console.log(e)}>
                <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
                  <FaSortAmountDownAlt /> Sort By
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item eventKey="low">Price: Low to High</Dropdown.Item>
                  <Dropdown.Item eventKey="high">Price: High to Low</Dropdown.Item>
                  <Dropdown.Item eventKey="name">Name</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Row>
            <ProductRow>
            {products.map((product) => (
  <Col xs={12} sm={6} md={4} lg={3} key={product.id} className="mb-4">
    <Link to={`/product/${product.id}`}>
      <StyledCard>
        <Card.Img variant="top" src={product.image} />
        <Card.Body>
          <Card.Title> {product.name}
          </Card.Title>
          <Card.Text>
            ${product.price}
          </Card.Text>
          <Button variant="primary" size="sm">
            <FaShoppingCart /> Add to Cart
          </Button>
        </Card.Body>
      </StyledCard>
    </Link>
  </Col>
))}

            </ProductRow>
          </Col>
        </Row>
      </Container>
    </animated.div>
  );
};

export default StorePage;

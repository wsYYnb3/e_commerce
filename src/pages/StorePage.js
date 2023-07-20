import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Dropdown } from 'react-bootstrap';
import { FaSearch, FaSortAmountDownAlt, FaShoppingCart, FaStar, FaListUl } from 'react-icons/fa';
import styled from '@emotion/styled';
import { useSpring, animated } from 'react-spring';
import { keyframes } from '@emotion/react';

const categories = ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5'];
const products = [
  { id: 1, name: 'Product 1', image: 'https://via.placeholder.com/150', price: 100 },
  { id: 2, name: 'Product 2', image: 'https://via.placeholder.com/150', price: 200 },
  { id: 3, name: 'Product 3', image: 'https://via.placeholder.com/150', price: 300 },
];

const SideBar = styled.div`
  border-right: 1px solid #ccc;
  padding: 1rem;
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const SearchIcon = styled(FaSearch)`
  margin-right: 10px;
`;

const StyledCard = styled(Card)`
  transition: 0.3s;
  &:hover {
    transform: scale(1.02);
  }
`;

const ProductRow = styled(Row)`
  padding-top: 1rem;
`;

const Star = styled(FaStar)`
  color: #ffc107;
  cursor: pointer;
`;

const RadioLabel = styled(animated.label)`
  cursor: pointer;
`;

const radioHighlight = keyframes`
  from {
    background-color: transparent;
  }
  to {
    background-color: #007bff;
  }
`;

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
                    custom
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
                  <StyledCard>
                    <Card.Img variant="top" src={product.image} />
                    <Card.Body>
                      <Card.Title>
                        <Star onClick={() => console.log("Favorited", product.name)} /> {product.name}
                      </Card.Title>
                      <Card.Text>
                        ${product.price}
                      </Card.Text>
                      <Button variant="primary" size="sm">
                        <FaShoppingCart /> Add to Cart
                      </Button>
                    </Card.Body>
                  </StyledCard>
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

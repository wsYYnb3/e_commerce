import React, { useState } from 'react';
import { Container, Row, Col, Dropdown, Form } from 'react-bootstrap';
import { FaSearch, FaSortAmountDownAlt, FaBars } from 'react-icons/fa';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components'
import { SideBar, SearchBox, SearchIcon, ProductRow } from '../styles/StoreStyles';
import Sidebar from '../components/Sidebar';
import ProductList from '../components/ProductList';

const categories = ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5'];
const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
`;
const StorePage = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const fade = useSpring({ from: { opacity: 0 }, opacity: 1 });

  
  return (
    <animated.div style={fade}>
      <Container fluid>
        <Row>
          <Col xs={12} lg={2}>
            {isSidebarOpen && (
              <SideBar>
                <SearchBox>
                  <SearchIcon />
                  <Form.Control type="search" placeholder="Search" />
                </SearchBox>
                <Sidebar 
                  categories={categories} 
                  selectedCategories={selectedCategories} 
                  setSelectedCategories={setSelectedCategories} 
                />
              </SideBar>
            )}
          </Col>

          <Col xs={12} lg={10}>
            <HeaderContainer className="px-3">
              <h4>Our Products</h4>
              <Actions>
                <FaBars onClick={() => setSidebarOpen(!isSidebarOpen)} style={{ cursor: 'pointer', marginRight: '10px' }} />
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
              </Actions>
            </HeaderContainer>
            <ProductRow>
              <ProductList selectedCategories={selectedCategories} />
            </ProductRow>
          </Col>
        </Row>
      </Container>
    </animated.div>
  );
};

export default StorePage;
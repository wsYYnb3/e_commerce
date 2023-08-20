import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Row, Col, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faSeedling } from "@fortawesome/free-solid-svg-icons";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const ProductItem = styled.div`
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

const StyledCard = styled(Card)`
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

const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  &:hover {
    color: inherit;
    text-decoration: none;
  }
`;
const StyledBanner = styled(Link)`
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

const HomePage = () => {
  const { t } = useTranslation();
  const products = useSelector((state) => state.items);
  const { language = "en" } = useParams();
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <animated.div style={{ opacity: 1 }}>
      <Container>
        {" "}
        <section className='welcome-section text-center'>
          <h1>{t("welcome")}</h1>
          <p>{t()}</p>
          <StyledBanner to={`/${language}/store`}>
            <img
              src='https://placehold.it/1000x200'
              alt='Start your YieldDeal journey'
            />
          </StyledBanner>
        </section>
        <section className='category-section py-5'>
          <h2 className='text-center'>Browse Categories</h2>
          <Row className='justify-content-center mt-4'>
            {" "}
            <Col sm={6} md={4} lg={3}>
              <StyledCard>
                <StyledLink to={`/${language}/vegetables`}>
                  <div>
                    <FontAwesomeIcon
                      icon={faSeedling}
                      size='3x'
                      color='green'
                    />
                    <Card.Body>
                      <Card.Title>Vegetables</Card.Title>
                    </Card.Body>
                  </div>
                </StyledLink>
              </StyledCard>
            </Col>
          </Row>
        </section>
        <section className='new-products-section text-center'>
          <h2 className='text-center'>New Arrivals</h2>
          <Carousel responsive={responsive} swipeable>
            {products.map((product, index) => (
              <ProductItem key={index}>
                <img src={product.image} alt={product.name} />
                <p>
                  {product.name}
                  <br /> ${product.price}
                </p>
              </ProductItem>
            ))}
          </Carousel>
        </section>
      </Container>
    </animated.div>
  );
};

export default HomePage;

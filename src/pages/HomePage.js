import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, Row, Col, Carousel } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faSeedling,
  faCarrot,
  faAppleAlt,
  faBreadSlice,
} from "@fortawesome/free-solid-svg-icons";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel as ResponsiveCarousel } from "react-responsive-carousel";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";

const StyledCard = styled(Card)`
  &:hover {
    transform: scale(1.02);
    transition: transform 0.2s;
  }
`;

const HomePage = () => {
  const fade = useSpring({ from: { opacity: 0 }, opacity: 1 });
  return (
    <animated.div style={fade}>
      <section className='welcome-section text-center'>
        <h1>Welcome to YieldDeal!</h1>
        <p>
          Your one-stop shop for fresh, local produce directly from farmers.
          Experience the taste of health and freshness!
        </p>
        <Link to='/store'>
          <Button variant='primary'>
            Get started with your YieldDeal journey
            <FontAwesomeIcon icon={faArrowRight} />
          </Button>
        </Link>
      </section>

      <section className='category-section py-5'>
        <h2 className='text-center'>Browse Categories</h2>
        <Row className='mt-4'>
          <Col sm={6} md={4} lg={3}>
            <StyledCard>
              <FontAwesomeIcon icon={faSeedling} size='4x' />
              <Card.Body>
                <Card.Title>Vegetables</Card.Title>
                <Card.Text>Explore fresh veggies</Card.Text>
                <Link to='/category/vegetables'>Browse Vegetables</Link>
              </Card.Body>
            </StyledCard>
          </Col>
          {/* Similarly add other categories like fruits, grains etc. */}
        </Row>
      </section>

      <section className='new-products-section'>
        <h2 className='text-center'>New Arrivals</h2>
        <ResponsiveCarousel className='mt-4'>
          {/* Your carousel items for newest products */}
        </ResponsiveCarousel>
      </section>

      <section className='popular-products-section py-5'>
        <h2 className='text-center'>Popular Picks</h2>
        <ResponsiveCarousel className='mt-4'>
          {/* Your carousel items for popular products */}
        </ResponsiveCarousel>
      </section>

      <section className='choice-section'>
        <h2 className='text-center'>Our Choices</h2>
        <ResponsiveCarousel className='mt-4'>
          {/* Your carousel items for choice products */}
        </ResponsiveCarousel>
      </section>
    </animated.div>
  );
};

export default HomePage;

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
import { useTranslation } from "react-i18next";

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

const StyledIcon = styled(FontAwesomeIcon)`
  color: green;
  font-size: 4rem;
`;

const IconWrapper = styled(Card.Img)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
`;

const HomePage = () => {
  const { t } = useTranslation();
  const fade = useSpring({ from: { opacity: 0 }, opacity: 1 });
  return (
    <animated.div style={fade}>
      <section className='welcome-section text-center'>
        <h1>{t("welcome")}</h1>
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

      <div>
        <section className='category-section py-5'>
          <h2 className='text-center'>Browse Categories</h2>
          <Row className='mt-4'>
            <Col sm={6} md={4} lg={3}>
              <StyledCard>
                <StyledLink to='/category/vegetables'>
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
            {/* Similarly add other categories like fruits, grains etc. */}
          </Row>
        </section>
      </div>

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

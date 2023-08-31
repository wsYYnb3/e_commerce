import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Row, Col, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faSeedling } from "@fortawesome/free-solid-svg-icons";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {
  fetchProducts,
  fetchNewestProducts,
  getFiveNewestProducts,
} from "../services/itemsSlice";
import axios from "axios";
import {
  getCurrencyDetails,
  getDisplayPrice,
  formatPrice,
} from "../utils/utils";
import {
  ProductItem,
  StyledCard,
  StyledProductName,
  StyledProductPrice,
  StyledLink,
  StyledBanner,
} from "../styles/HomePageStyles";

const backendServer = "http://localhost:5000";
const HomePage = () => {
  const { t } = useTranslation();
  const [bannerImage, setBannerImage] = useState("");
  const products = useSelector((state) => state.items);
  const dispatch = useDispatch();
  const { language } = useParams();
  useEffect(() => {
    axios
      .get(backendServer)
      .then((response) => {
        if (response.data && response.data.imageUrl) {
          setBannerImage(`${backendServer}${response.data.imageUrl}`);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the banner data:", error);
      });

    dispatch(fetchProducts());
  }, [dispatch]);
  const renderProducts = (items) =>
    items.map((product, index) => {
      const { currencyId, symbol } = getCurrencyDetails(language);
      const displayPrice = getDisplayPrice(product, currencyId);
      const formattedPrice = formatPrice(displayPrice, symbol);
      return (
        <StyledLink
          key={index}
          to={`/${language}/product/${product.id}/${t(product.slug_key)}`}
        >
          <ProductItem>
            <img
              src={product.productimages[0]?.image?.file_path ?? ""}
              alt={t(product.name_key)}
            />
            <StyledProductName>{t(product.name_key)}</StyledProductName>
            <StyledProductPrice>{formattedPrice}</StyledProductPrice>
          </ProductItem>
        </StyledLink>
      );
    });
  const fiveNewestProducts = useSelector(getFiveNewestProducts);
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
            <img src={bannerImage} alt='Start your YieldDeal journey' />
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
            {renderProducts(fiveNewestProducts)}
          </Carousel>
        </section>
        <section className='new-products-section text-center mt-4'>
          <h2 className='text-center'>Featured Products</h2>
          <Carousel responsive={responsive} swipeable>
            {renderProducts(products.items)}
          </Carousel>
        </section>
      </Container>
    </animated.div>
  );
};

export default HomePage;

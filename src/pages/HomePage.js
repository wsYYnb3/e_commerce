import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Card, Row, Col, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSeedling } from "@fortawesome/free-solid-svg-icons";
import { animated } from "react-spring";
import { useTranslation } from "react-i18next";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import {
  getCurrencyDetails,
  getDisplayPrice,
  formatPrice,
  getImageById,
} from "../utils/utils";
import {
  ProductItem,
  StyledCard,
  StyledProductName,
  StyledProductPrice,
  StyledLink,
  StyledBanner,
} from "../styles/HomePageStyles";
import { fetchProducts, getNewestProducts } from "../services/itemsSlice";
import { fetchCategories } from "../services/categoriesSlice";

const HomePage = () => {
  const { t } = useTranslation();
  const categories = useSelector((state) => state.categories.categories);
  const products = useSelector((state) => state.items);
  const dispatch = useDispatch();
  const { language } = useParams();
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);
  const renderProducts = (items) =>
    items.map((product) => {
      const { currencyId, symbol } = getCurrencyDetails(language);
      const displayPrice = getDisplayPrice(product, currencyId);
      const formattedPrice = formatPrice(displayPrice, symbol);
      return (
        <StyledLink
          key={product.id}
          to={`/${language}/product/${product.id}/${t(product.slug_key)}`}
        >
          <ProductItem>
            <img
              src={getImageById(product.productcardimages[0]?.image?.id) ?? ""}
              alt={t(product.name_key)}
            />
            <StyledProductName>{t(product.name_key)}</StyledProductName>
            <StyledProductPrice>{formattedPrice}</StyledProductPrice>
          </ProductItem>
        </StyledLink>
      );
    });

  const newestProducts = useSelector(getNewestProducts);
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 3000, min: 1400 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 1400, min: 1000 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1000, min: 768 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
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
            <img src={getImageById(60)} alt='Start your journey' />
          </StyledBanner>
        </section>
        <section className='category-section py-5'>
          <h2 className='text-center'>Browse Categories</h2>
          <Row className='justify-content-center mt-4'>
            {categories.map((category) => (
              <Col sm={6} md={4} lg={3} key={category.id}>
                <StyledCard>
                  <StyledLink
                    to={`/${language}/store/${category.id}/${t(
                      category.slug_key
                    )}`}
                  >
                    <div className='icon-container'>
                      <img
                        src={getImageById(category.icon)}
                        alt={`${t(category.name_key)} icon`}
                      />
                    </div>
                    <h2 className='title'>{t(category.name_key)}</h2>
                  </StyledLink>
                </StyledCard>
              </Col>
            ))}
          </Row>
        </section>
        <section className='new-products-section text-center'>
          <h2 className='text-center'>New Arrivals</h2>
          <Carousel responsive={responsive} swipeable>
            {renderProducts(newestProducts)}
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

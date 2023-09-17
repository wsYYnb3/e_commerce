import React, { useState, useEffect, useCallback } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import ProductDetail from "../components/ProductDetail";
//import ProductSpecification from '../components/ProductSpecification';
//import FarmerProfile from '../components/FarmerProfile';
//import FarmInformation from '../components/FarmInformation';
//import TechnicalInformation from '../components/TechnicalInformation';
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../services/itemsSlice";
import TechnicalInfo from "../components/TechnicalInfo";
import Description from "../components/Description";
import ProductPurchase from "../components/ProductPurchase";
import ImageGallery from "../components/ImageGallery";
import Keywords from "../components/Keywords";
import { useTranslation } from "react-i18next";
import {
  getCurrencyDetails,
  getDisplayPrice,
  formatPrice,
} from "../utils/utils";
import {
  StyledCol,
  StyledImageCol,
  ProductPageContainer,
  DescriptionTechnicalInfoContainer,
  DetailPurchaseContainer,
} from "../styles/ProductPageStyles";
import LoadingIndicator from "../components/LoadingIndicator";

const ProductPage = () => {
  const { productId: id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(null);
  const fade = useSpring({ from: { opacity: 0 }, opacity: 1 });
  const { t } = useTranslation();
  const product = useSelector((state) => state.items.selectedProduct);

  const dispatch = useDispatch();
  const { language } = useParams();
  const { currencyId, symbol } = getCurrencyDetails(language);
  const displayPrice = product ? getDisplayPrice(product, currencyId) : null;
  const formattedPrice = displayPrice
    ? formatPrice(displayPrice, symbol)
    : null;
  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (product) {
      setTotalPrice(quantity * displayPrice);
    }
  }, [quantity, product, displayPrice]);

  const increaseQuantity = useCallback(() => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  }, []);

  const decreaseQuantity = useCallback(() => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  }, []);

  if (!product) {
    return <LoadingIndicator />;
  }

  return (
    <animated.div style={fade}>
      <Row>
        <Col
          xs={12}
          sm={12}
          md={12}
          lg={4}
          className=' mr-auto ml-auto'
          style={{ marginLeft: "6rem", marginRight: "5rem" }}
        >
          <ImageGallery images={product.productimages} />
          <Keywords keywords={product.keyword_id_keywords} />
        </Col>
        <Col
          xs={12}
          sm={12}
          md={12}
          lg={6}
          className='ml-auto mr-auto mt-3'
          style={{ marginLeft: "3rem" }}
        >
          <ProductDetail item={product} />
          {
            <ProductPurchase
              product={product}
              quantity={quantity}
              decreaseQuantity={decreaseQuantity}
              increaseQuantity={increaseQuantity}
              totalPrice={totalPrice}
            />
          }
        </Col>
      </Row>
      <DescriptionTechnicalInfoContainer className='mt-3'>
        <Col md={12}>
          <Description description={t(product.description_key)} />
          <TechnicalInfo data={product.technicalinformations} />;
        </Col>
      </DescriptionTechnicalInfoContainer>
    </animated.div>
  );
};

export default ProductPage;

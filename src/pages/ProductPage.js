import React, { useState, useEffect, useCallback } from "react";
import { Col, Row } from "react-bootstrap";
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
} from "../styles/ProductPageStyles";

const ProductPage = () => {
  const { productId: id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(null);
  const fade = useSpring({ from: { opacity: 0 }, opacity: 1 });
  const { t } = useTranslation();
  const product = useSelector((state) => state.items.selectedProduct);

  const dispatch = useDispatch();
  const { language } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (product) {
      setTotalPrice(quantity * displayPrice);
    }
  }, [quantity, product]);

  const increaseQuantity = useCallback(() => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  }, []);

  const decreaseQuantity = useCallback(() => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  }, []);

  if (!product) {
    console.log("No product");
    return <div>Loading...</div>;
  }
  const { currencyId, symbol } = getCurrencyDetails(language);
  const displayPrice = getDisplayPrice(product, currencyId);
  const formattedPrice = formatPrice(displayPrice, symbol);
  return (
    <animated.div style={fade}>
      <ProductPageContainer>
        <Row>
          <StyledImageCol md={5} className='mx-5'>
            <div className='image-keywords-container'>
              <ImageGallery images={product.productimages} />
              <Keywords keywords={product.keyword_id_keywords} />
            </div>
          </StyledImageCol>
          <StyledCol md={6}>
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
          </StyledCol>
        </Row>
        <DescriptionTechnicalInfoContainer>
          <Col md={12}>
            <Description description={t(product.description_key)} />
            <TechnicalInfo data={product.technicalinformations} />;
          </Col>
        </DescriptionTechnicalInfoContainer>
      </ProductPageContainer>
    </animated.div>
  );
};

export default ProductPage;

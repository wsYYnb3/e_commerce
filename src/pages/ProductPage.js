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
import LoadingIndicator from "../components/LoadingIndicator";
import { useTranslation } from "react-i18next";
import { getCurrencyDetails, getDisplayPrice } from "../utils/utils";
import {
  DescriptionTechnicalInfoContainer,
  PageTitle,
} from "../styles/ProductPageStyles";

const ProductPage = () => {
  const { productId: id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(null);
  const fade = useSpring({ from: { opacity: 0 }, opacity: 1 });
  const { t } = useTranslation();
  const product = useSelector((state) => state.items.selectedProduct);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const { language } = useParams();
  const { currencyId } = getCurrencyDetails(language);
  const displayPrice = product
    ? getDisplayPrice(product, currencyId).toFixed(2)
    : null;

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      dispatch(fetchProductById(id))
        .then(() => {
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
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
  if (isLoading) {
    return <LoadingIndicator />;
  }
  if (!product) {
    return <PageTitle>{t("Product not found")}</PageTitle>;
  }

  return (
    <>
      <PageTitle>{t(product.name_key)}</PageTitle>
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
    </>
  );
};

export default ProductPage;

import React, { useEffect } from "react";
import { Col, Card, Button } from "react-bootstrap";
import { FaShoppingCart, FaStar } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, setCart } from "../services/cartSlice";
import { addFavorite, removeFavorite } from "../services/favoritesSlice";
import { useUser } from "@clerk/clerk-react";
import { fetchProducts, fetchNewestProducts } from "../services/itemsSlice";
import { useTranslation } from "react-i18next";
import {
  getCurrencyDetails,
  getDisplayPrice,
  formatPrice,
} from "../utils/utils";
import {
  CardContainer,
  StyledStar,
  StyledFooter,
  StyledCard,
  StyledLink,
  StyledButton,
} from "../styles/ProductListStyles";

const ProductList = ({ selectedCategories, items: products }) => {
  const favorites = useSelector((state) => state.favorites);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { language } = useParams();
  const { user } = useUser();
  const { t } = useTranslation();
  const navigateToProduct = (productId, slugKey) => {
    navigate(`/${language}/product/${productId}/${t(slugKey)}`);
  };

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    const productWithQuantity = { ...product, quantity: 1 };
    dispatch(addToCart(productWithQuantity));
    toast.success("Product added to cart!", { position: "bottom-center" });
  };
  const toggleFavorite = (e, product) => {
    e.stopPropagation();
    if (user) {
      if (isFavorite(product)) {
        dispatch(removeFavorite(product.id));
        toast.info("Product removed from favorites!", {
          position: "bottom-center",
        });
      } else {
        dispatch(addFavorite(product));
        toast.success("Product added to favorites!", {
          position: "bottom-center",
        });
      }
    } else {
      navigate(`/${language}/sign-up`);
    }
  };
  const isFavorite = (product) => {
    return favorites.some((item) => item.id === product.id);
  };
  const filteredProducts =
    selectedCategories.length > 0
      ? products.filter((product) =>
          selectedCategories.some(
            (category) => category.id === product.category.id
          )
        )
      : products;

  if (filteredProducts.length === 0) {
    return <p>No products found for the selected categories.</p>;
  }
  return filteredProducts.map((product) => {
    const { currencyId, symbol } = getCurrencyDetails(language);
    const displayPrice = getDisplayPrice(product, currencyId);
    const formattedPrice = formatPrice(displayPrice, symbol);
    return (
      <Col xs={12} sm={6} md={4} lg={3} key={product.id} className='mb-4'>
        <CardContainer>
          <StyledStar
            onClick={(e) => toggleFavorite(e, product)}
            favorite={isFavorite(product) ? 1 : 0}
          />
          <StyledCard
            onClick={() => navigateToProduct(product.id, product.slug_key)}
          >
            <Card.Img
              variant='top'
              src={product.productimages[0]?.image?.file_path ?? ""}
            />
            <Card.Body>
              <Card.Title>
                <StyledLink
                  to={`/${language}/product/${product.id}/${t(
                    product.slug_key
                  )}`}
                >
                  {t(product.name_key)}
                </StyledLink>
              </Card.Title>
              <Card.Text>
                <StyledLink
                  to={`/${language}/product/${product.id}/${t(
                    product.slug_key
                  )}`}
                >
                  {product.vendor.name}
                  <br />
                  {t(product.origin_key)}
                </StyledLink>
              </Card.Text>
            </Card.Body>
            <StyledFooter>
              <div className='product-price'>
                <b>{formattedPrice}</b>
                <span>{t(product.unit_of_measure.name)}</span>
              </div>
              <StyledButton onClick={(e) => handleAddToCart(e, product)}>
                <FaShoppingCart /> Add to Cart
              </StyledButton>
            </StyledFooter>
          </StyledCard>
        </CardContainer>
      </Col>
    );
  });
};

export default ProductList;

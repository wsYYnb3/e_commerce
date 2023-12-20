import React, { useEffect } from "react";
import { Col, Card } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useUser } from "@clerk/clerk-react";
import { useTranslation } from "react-i18next";
import { addToCart } from "../services/cartSlice";
import {
  addToFavorites,
  removeFromFavorites,
  fetchFavorites,
} from "../services/favoritesSlice";

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
import { getImageById } from "./../utils/utils";
const ProductList = ({ selectedCategories, items: products }) => {
  const favorites = useSelector((state) => state.favorites.favoritesItems);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { language } = useParams();
  const { user } = useUser();
  const { t } = useTranslation();
  const navigateToProduct = (productId, slugKey) => {
    navigate(`/${language}/product/${productId}/${t(slugKey)}`);
  };

  const customerId = user?.id;

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    const newProduct = { ...product, quantity: 1, customerId: customerId };
    dispatch(addToCart(newProduct));
    toast.success("Product added to cart!", { position: "bottom-center" });
  };

  const toggleFavorite = (e, product) => {
    e.stopPropagation();
    if (user) {
      if (isFavorite(product)) {
        const data = { productId: product.id, customerId: customerId };
        dispatch(removeFromFavorites(data));
        toast.info("Product removed from favorites!", {
          position: "bottom-center",
        });
      } else {
        const data = { productId: product.id, customerId: customerId };
        dispatch(addToFavorites(data));
        toast.success("Product added to favorites!", {
          position: "bottom-center",
        });
      }
    } else {
      navigate(`/${language}/sign-up`);
    }
  };
  const isFavorite = (product) => {
    return favorites.some((item) => item.product_id === product.id);
  };

  const filteredProducts =
    selectedCategories.length > 0
      ? products.filter((product) =>
          selectedCategories.some(
            (category) => category.id === product.category.id
          )
        )
      : products;
  useEffect(() => {
    if (customerId) {
      dispatch(fetchFavorites(customerId));
    }
  }, [dispatch, user, customerId]);
  if (filteredProducts.length === 0) {
    return <p>No products found.</p>;
  }
  return filteredProducts.map((product) => {
    const { currencyId, symbol } = getCurrencyDetails(language);
    const displayPrice = getDisplayPrice(product, currencyId).toFixed(2);
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
              src={getImageById(product.productcardimages[0]?.image?.id) ?? ""}
              alt={t(product.name_key)}
              style={{ height: "200px", objectFit: "contain" }}
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

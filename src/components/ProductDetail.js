import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  addToFavorites,
  removeFromFavorites,
  fetchFavorites,
} from "../services/favoritesSlice";
import { useClerk } from "@clerk/clerk-react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import {
  getCurrencyDetails,
  getDisplayPrice,
  formatPrice,
} from "../utils/utils";
import {
  StyledStar,
  StyledCard,
  PriceContainer,
} from "../styles/ProductDetailStyles";

const ProductDetail = ({ item: product }) => {
  const { user } = useClerk();
  const favorites = useSelector((state) => state.favorites.favoritesItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { language } = useParams();
  const { t } = useTranslation();
  const customerId = user?.id;
  const toggleFavorite = (e, product) => {
    e.stopPropagation();
    if (user) {
      const data = { productId: product.id, customerId: customerId };
      if (isFavorite(product)) {
        dispatch(removeFromFavorites(data));
        toast.info("Product removed from favorites!", {
          position: "bottom-center",
        });
      } else {
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
    console.log(product);
    console.log(favorites);
    return favorites.some((item) => item && item.product_id === product.id);
  };
  useEffect(() => {
    if (customerId) {
      dispatch(fetchFavorites(customerId));
    }
  }, [dispatch, user]);
  const { currencyId, symbol } = getCurrencyDetails(language);
  const displayPrice = getDisplayPrice(product, currencyId);
  const formattedPrice = formatPrice(displayPrice, symbol);
  return (
    <StyledCard>
      <Card.Body>
        <Card.Title>{t(product.name_key)}</Card.Title>
        <Card.Text>Origin: {t(product.origin_key)}</Card.Text>
        <PriceContainer>
          <b>
            {displayPrice} {symbol}
            <br />
            {t(product.unit_of_measure.name)}
          </b>
          <StyledStar
            onClick={(e) => toggleFavorite(e, product)}
            favorite={isFavorite(product) ? 1 : 0}
          />
        </PriceContainer>
      </Card.Body>
    </StyledCard>
  );
};

export default ProductDetail;

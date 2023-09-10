import { Card } from "react-bootstrap";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { addFavorite, removeFavorite } from "../services/favoritesSlice";
import { useClerk } from "@clerk/clerk-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaShoppingCart, FaStar } from "react-icons/fa";
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
import { useUser } from "@clerk/clerk-react";
const ProductDetail = ({ item: product }) => {
  const { user } = useClerk();
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { language } = useParams();
  const { t } = useTranslation();
  const handleFavoriteClick = (product) => {
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
    return product?.id && favorites.some((item) => item.id === product.id);
  };
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
            onClick={(e) => handleFavoriteClick(product)}
            favorite={isFavorite(product) ? 1 : 0}
          />
        </PriceContainer>
      </Card.Body>
    </StyledCard>
  );
};

export default ProductDetail;

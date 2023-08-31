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
export const StyledStar = styled(FaStar)`
  position: absolute;
  top: 10px;
  right: 10px;
  color: ${(props) => (props.favorite ? "gold" : "gray")};
  cursor: pointer;
  z-index: 2;
  font-size: 24px;

  &:hover {
    color: gold;
  }
`;

export const StyledCard = styled(Card)`
  margin-top: 20px;
  padding: 20px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
`;

export const PriceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

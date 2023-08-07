import { Card } from "react-bootstrap";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { addFavorite, removeFavorite } from "../services/favoritesSlice";
import { useClerk } from "@clerk/clerk-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaShoppingCart, FaStar } from "react-icons/fa";

const StyledStar = styled(FaStar)`
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

const StyledCard = styled(Card)`
  margin-top: 20px;
  padding: 20px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
`;

const PriceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProductDetail = ({ name, unit, origin, price, id }) => {
  const { user } = useClerk();
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isFavorite = () => {
    return favorites.some((item) => item.id === id);
  };

  const handleFavoriteClick = () => {
    if (user) {
      if (isFavorite()) {
        dispatch(removeFavorite(id));
        toast.info("Removed from favorites", {
          position: "bottom-center",
        });
      } else {
        dispatch(addFavorite({ id, name, unit, origin, price }));
        toast.success("Added to favorites", {
          position: "bottom-center",
        });
      }
    } else {
      navigate("/sign-up");
    }
  };

  return (
    <StyledCard>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>Origin: {origin}</Card.Text>
        <PriceContainer>
          Price:{" "}
          <b>
            ${price}/{unit}
          </b>
          <StyledStar
            onClick={(e) => handleFavoriteClick()}
            favorite={isFavorite() ? 1 : 0}
          />
        </PriceContainer>
      </Card.Body>
    </StyledCard>
  );
};

export default ProductDetail;

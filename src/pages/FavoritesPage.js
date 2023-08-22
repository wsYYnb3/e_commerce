import React from "react";
import { useSelector } from "react-redux";
import { Row, Col, Card } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { removeFavorite } from "../services/favoritesSlice";

const CardContainer = styled.div`
  position: relative;
  margin-bottom: 4px;
  cursor: pointer;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.98);
  }
`;

const StyledStar = styled(FaStar)`
  position: absolute;
  top: 10px;
  right: 10px;
  color: ${(props) => (props.favorite === "true" ? "gold" : "gray")};
  cursor: pointer;
  z-index: 2;
  font-size: 24px;

  &:hover {
    color: gold;
  }
`;

const StyledCard = styled(Card)`
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);

  &:hover {
    box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.2);
  }

  .card-img-top {
    height: 200px;
    object-fit: cover;
  }
`;

const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;

  &:hover {
    color: inherit;
    text-decoration: none;
  }
`;

const FavoritesPage = () => {
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();
  const { language } = useParams();

  const handleRemoveFavorite = (e, product) => {
    e.stopPropagation();
    dispatch(removeFavorite(product.id));
    toast.info("Product removed from favorites!", {
      position: "bottom-center",
    });
  };

  if (favorites.length === 0) {
    return <p>No products found in favorites.</p>;
  }

  return (
    <Row className='p-5'>
      {favorites.map((product) => (
        <Col xs={12} sm={6} md={4} lg={3} key={product.id} className='mb-4'>
          <CardContainer>
            <StyledStar
              onClick={(e) => handleRemoveFavorite(e, product)}
              favorite='true'
            />
            <StyledLink to={`/${language}/product/${product.id}`}>
              <StyledCard>
                <Card.Img variant='top' src={product.image} />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>
                    {product.manufacturer}
                    <br />
                    {product.origin}
                  </Card.Text>
                </Card.Body>
              </StyledCard>
            </StyledLink>
          </CardContainer>
        </Col>
      ))}
    </Row>
  );
};

export default FavoritesPage;

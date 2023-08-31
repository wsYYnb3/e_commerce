import React from "react";
import { useSelector } from "react-redux";
import { Row, Col, Card } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { removeFavorite } from "../services/favoritesSlice";
import { useTranslation } from "react-i18next";
import {
  CardContainer,
  StyledStar,
  StyledCard,
  StyledLink,
} from "../styles/FavoritesPageStyles";

const FavoritesPage = () => {
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();
  const { language } = useParams();
  const { t } = useTranslation();
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
                <Card.Img
                  variant='top'
                  src={product.productimages[0]?.image?.file_path ?? ""}
                />
                <Card.Body>
                  <Card.Title>{t(product.name_key)}</Card.Title>
                  <Card.Text>
                    {product.vendor.name}
                    <br />
                    {t(product.origin_key)}
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

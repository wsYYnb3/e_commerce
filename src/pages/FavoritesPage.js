import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Row, Col, Card } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {
  removeFromFavorites,
  fetchFavorites,
} from "../services/favoritesSlice";
import { useTranslation } from "react-i18next";
import {
  CardContainer,
  StyledStar,
  StyledCard,
  StyledLink,
} from "../styles/FavoritesPageStyles";
import { useUser } from "@clerk/clerk-react";
const FavoritesPage = () => {
  const favorites = useSelector((state) => state.favorites.favoritesItems);
  const dispatch = useDispatch();
  const { language } = useParams();
  const { t } = useTranslation();
  const { user } = useUser();
  const customer_id = user?.id;
  const handleRemoveFavorite = (e, product_id, customer_id) => {
    e.stopPropagation();
    const data = { product_id: product_id, customer_id: customer_id };
    dispatch(removeFromFavorites(data));
    toast.info("Product removed from favorites!", {
      position: "bottom-center",
    });
  };

  useEffect(() => {
    dispatch(fetchFavorites(customer_id));
  }, [dispatch]);
  if (!favorites || favorites.length === 0) {
    return <p>No products found in favorites.</p>;
  }

  return (
    <Row className='p-5'>
      {favorites.map((data) => (
        <Col
          xs={12}
          sm={6}
          md={4}
          lg={3}
          key={data.product.id}
          className='mb-4'
        >
          <CardContainer>
            <StyledStar
              onClick={(e) =>
                handleRemoveFavorite(e, data.product.id, customer_id)
              }
              favorite='true'
            />
            <StyledLink
              to={`/${language}/product/${data.product.id}/${t(
                data.product.slug_key
              )}`}
            >
              <StyledCard>
                <Card.Img
                  variant='top'
                  src={
                    data.product.productcardimages[0]?.image?.file_path ?? ""
                  }
                  alt={t(data.product.name_key)}
                />
                <Card.Body>
                  <Card.Title>{t(data.product.name_key)}</Card.Title>
                  <Card.Text>
                    {data.product.vendor.name}
                    <br />
                    {t(data.product.origin_key)}
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

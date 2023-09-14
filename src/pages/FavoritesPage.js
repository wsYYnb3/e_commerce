import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Row, Col, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useUser } from "@clerk/clerk-react";

import {
  CardContainer,
  StyledStar,
  StyledCard,
  StyledLink,
} from "../styles/FavoritesPageStyles";
import {
  removeFromFavorites,
  fetchFavorites,
} from "../services/favoritesSlice";

const FavoritesPage = () => {
  const favorites = useSelector((state) => state.favorites.favoritesItems);
  const dispatch = useDispatch();
  const { language } = useParams();
  const { t } = useTranslation();
  const { user } = useUser();
  const customerId = user?.id;
  const handleRemoveFavorite = (e, productId, customerId) => {
    e.stopPropagation();
    const data = { productId: productId, customerId: customerId };
    dispatch(removeFromFavorites(data));
    toast.info("Product removed from favorites!", {
      position: "bottom-center",
    });
  };

  useEffect(() => {
    if (customerId) {
      dispatch(fetchFavorites(customerId));
    }
  }, [dispatch, language, customerId]);
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
                handleRemoveFavorite(e, data.product.id, customerId)
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

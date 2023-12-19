import React, { useEffect } from "react";
import { Container, Row, Col, Button, ListGroup, Image } from "react-bootstrap";
import { FaTrash, FaShoppingCart } from "react-icons/fa";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../services/cartSlice";
import { useTranslation } from "react-i18next";
import { useClerk } from "@clerk/clerk-react";

import { fetchCart } from "../services/cartSlice";
import {
  getDisplayPrice,
  getCurrencyDetails,
  calculateSubtotal,
  formatPrice,
} from "../utils/utils";
import {
  StyledWrapper,
  StyledCard,
  StyledListGroupItem,
} from "../styles/CartPageStyles";
import { getImageById } from "./../utils/utils";
import { StyledLink } from "./../styles/ProductListStyles";
const CartPage = () => {
  const cart = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { language } = useParams();
  const { user } = useClerk();
  const customerId = user?.id;
  useEffect(() => {
    if (customerId) {
      dispatch(fetchCart(customerId));
    }
  }, [dispatch, customerId]);

  const handleRemoveFromCart = (e, product_id, customer_id) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(removeFromCart({ product_id, customer_id }));
    toast.error("Product removed from cart", {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  const { t } = useTranslation();

  const { currencyId, symbol } = getCurrencyDetails(language);
  const subtotal = calculateSubtotal(cart, currencyId, symbol).toFixed(2);
  const formattedSubtotal = formatPrice(subtotal, symbol);
  if (!cart) {
    return <div>Loading...</div>;
  }
  if (cart === "loading") {
    return <div>Loading...</div>;
  }

  if (cart === "failed") {
    return <div>Error: </div>;
  }

  return (
    <StyledWrapper>
      <Container>
        <Row>
          <Col md={9}>
            <h2>
              <FaShoppingCart /> {t("shopping_cart")}
            </h2>
            {cart === "loading" && <div>{t("loading")}...</div>}
            {cart === "failed" && <div>{t("error_loading_cart")}</div>}
            {cart.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                {t("empty_cart_message")}
              </motion.div>
            ) : (
              <ListGroup variant='flush'>
                {cart.map((cartItem) => {
                  const { product } = cartItem;
                  const currentProductId = cartItem.product.id;
                  const displayPrice = getDisplayPrice(
                    product,
                    currencyId
                  ).toFixed(2);

                  const formattedPrice = formatPrice(displayPrice, symbol);

                  return (
                    <StyledListGroupItem key={currentProductId}>
                      <StyledLink
                        to={`/${language}/product/${currentProductId}/${t(
                          product.slug_key
                        )}`}
                      >
                        <Row className='align-items-center'>
                          <Col md={2}>
                            <Image
                              src={
                                getImageById(
                                  product?.productcartimages?.[0]?.image_id
                                ) || "path/to/placeholder/image.jpg"
                              }
                              alt={t(product.name_key)}
                              fluid
                              rounded
                            />
                          </Col>
                          <Col md={4}>
                            <b>{t(product.name_key)}</b>
                            <br />
                            {t(product.unit_of_measure.name)}
                          </Col>
                          <Col md={2}>
                            {formattedPrice} * {cartItem.quantity}
                          </Col>
                          <Col md={2}></Col>
                          <Col md={2}>
                            <Button
                              variant='danger'
                              size='sm'
                              onClick={(e) => {
                                handleRemoveFromCart(
                                  e,
                                  currentProductId,
                                  customerId
                                );
                              }}
                            >
                              <FaTrash />
                            </Button>
                          </Col>
                        </Row>
                      </StyledLink>
                    </StyledListGroupItem>
                  );
                })}
              </ListGroup>
            )}
          </Col>
          <Col md={3}>
            <StyledCard>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>
                    Subtotal (
                    {cart.reduce((acc, item) => acc + item.quantity, 0)}) items
                  </h3>
                  {formattedSubtotal}
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    type='button'
                    className='btn-block'
                    disabled={cart.length === 0}
                    onClick={() => navigate(`/${language}/checkout`)}
                  >
                    Proceed To Checkout
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </StyledCard>
          </Col>
        </Row>
      </Container>
    </StyledWrapper>
  );
};
export default CartPage;

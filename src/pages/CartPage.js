import React from "react";
import {
  Container,
  Row,
  Col,
  Button,
  ListGroup,
  Image,
  Card,
  Form,
} from "react-bootstrap";
import { FaTrash, FaShoppingCart } from "react-icons/fa";
import styled from "styled-components";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, adjustQuantity } from "../services/cartSlice";
import { useTranslation } from "react-i18next";
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

const CartPage = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { language } = useParams();
  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
    toast.error("Product removed from cart", {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  const { t } = useTranslation();
  const handleAdjustQuantity = (id, qty) => {
    dispatch(adjustQuantity({ id, quantity: qty }));
  };
  const { currencyId, symbol } = getCurrencyDetails(language);
  const subtotal = calculateSubtotal(cart, currencyId, symbol);
  const formattedSubtotal = formatPrice(subtotal, symbol);

  return (
    <StyledWrapper>
      <Container>
        <Row>
          <Col md={9}>
            <h2>
              <FaShoppingCart /> Shopping Cart
            </h2>
            {cart.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                Your cart is empty
              </motion.div>
            ) : (
              <ListGroup variant='flush'>
                {cart.map((product) => {
                  const displayPrice = getDisplayPrice(product, currencyId);
                  const formattedPrice = formatPrice(displayPrice, symbol);
                  return (
                    <StyledListGroupItem key={product.id}>
                      <Row className='align-items-center'>
                        <Col md={2}>
                          <Image
                            src={product.cartImage} //to be added
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
                          {displayPrice} * {product.quantity}
                        </Col>
                        <Col md={2}></Col>
                        <Col md={2}>
                          <Button
                            variant='danger'
                            size='sm'
                            onClick={() => handleRemoveFromCart(product.id)}
                          >
                            <FaTrash />
                          </Button>
                        </Col>
                      </Row>
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

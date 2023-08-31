import React from "react";
import { Button, FormControl } from "react-bootstrap";
import { FaShoppingCart, FaMinus, FaPlus } from "react-icons/fa";
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, adjustQuantity } from "../services/cartSlice";
import {
  getCurrencyDetails,
  getDisplayPrice,
  formatPrice,
} from "../utils/utils";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  StyledContainer,
  QuantityWrapper,
  StyledButton,
} from "../styles/ProductPurchaseStyles";

const ProductPurchase = ({ product }) => {
  const { language } = useParams();
  const { t } = useTranslation();
  const [quantity, setQuantity] = React.useState(1);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    const newProduct = { ...product, quantity };
    dispatch(addToCart(newProduct));
    toast.success("Product added to cart!", { position: "bottom-center" });
  };

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const { currencyId, symbol } = getCurrencyDetails(language);
  const displayPrice = getDisplayPrice(product, currencyId);
  const formattedPrice = formatPrice(displayPrice, symbol);
  const totalPrice = displayPrice * quantity;
  return (
    <StyledContainer>
      <QuantityWrapper>
        <FaMinus onClick={handleDecreaseQuantity} />
        <FormControl
          type='number'
          value={quantity}
          readOnly
          className='mx-2 text-center'
          style={{ width: "60px" }}
        />
        <FaPlus onClick={handleIncreaseQuantity} />
        <StyledButton variant='primary' size='sm' onClick={handleAddToCart}>
          {totalPrice} {symbol} <FaShoppingCart />
        </StyledButton>
      </QuantityWrapper>
    </StyledContainer>
  );
};

export default ProductPurchase;

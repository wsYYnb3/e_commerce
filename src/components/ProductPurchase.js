import React from "react";
import { FormControl } from "react-bootstrap";
import { FaShoppingCart, FaMinus, FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useUser } from "@clerk/clerk-react";

import {
  StyledContainer,
  QuantityWrapper,
  StyledButton,
} from "../styles/ProductPurchaseStyles";
import {
  getCurrencyDetails,
  getDisplayPrice,
  formatPrice,
} from "../utils/utils";
import { addToCart } from "../services/cartSlice";

const ProductPurchase = ({ product }) => {
  const { language } = useParams();
  const { t } = useTranslation();
  const [quantity, setQuantity] = React.useState(1);
  const dispatch = useDispatch();
  const { user } = useUser();
  const customerId = user?.id;
  const handleAddToCart = () => {
    const newProduct = { ...product, quantity, customerId };
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
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 400);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 400);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { currencyId, symbol } = getCurrencyDetails(language);
  const displayPrice = getDisplayPrice(product, currencyId).toFixed(2);
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
        <StyledButton
          variant='primary'
          size='sm'
          onClick={handleAddToCart}
          $isMobile={isMobile}
        >
          <span className='button-text'>
            {totalPrice.toFixed(2)} {symbol}
          </span>{" "}
          <FaShoppingCart />
        </StyledButton>
      </QuantityWrapper>
    </StyledContainer>
  );
};

export default ProductPurchase;

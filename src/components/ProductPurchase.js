import React from "react";
import { Button, FormControl } from "react-bootstrap";
import { FaShoppingCart, FaMinus, FaPlus } from "react-icons/fa";
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, adjustQuantity } from "../services/cartSlice";

const StyledContainer = styled.div`
  margin-top: 20px;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
`;

const QuantityWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StyledButton = styled(Button)`
  margin-top: 0;
  margin-left: auto;
  display: block;
`;

const ProductPurchase = ({ product }) => {
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

  const totalPrice = product.price * quantity;

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
          Total: ${totalPrice} <FaShoppingCart />
        </StyledButton>
      </QuantityWrapper>
      <ToastContainer />
    </StyledContainer>
  );
};

export default ProductPurchase;

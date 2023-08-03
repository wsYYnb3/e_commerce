import React, {useContext} from 'react';
import { Button, FormControl } from 'react-bootstrap';
import { FaShoppingCart, FaMinus, FaPlus } from 'react-icons/fa';
import styled from 'styled-components';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CartContext } from "../contexts/CartContext";
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

const ProductPurchase = ({ 
  product,  
  quantity, 
  decreaseQuantity, 
  increaseQuantity, 
  totalPrice 
}) => {
    const [cart, setCart] = useContext(CartContext);
  const addToCart = () => {
    const cartItem = cart.find(item => item.name === product.name);
    
    if (cartItem) {
      cartItem.quantity += quantity;
      toast.success('Product quantity updated in cart!', { position: 'bottom-center' });
    } else {
      setCart([
        ...cart, 
        { 
          ...product, 
          quantity 
        }
      ]);
      toast.success('Product added to cart!', { position: 'bottom-center' });
    }
  }

  return (
    <StyledContainer>
      <QuantityWrapper>
        <FaMinus onClick={decreaseQuantity}/>
        <FormControl type="number" value={quantity} readOnly className="mx-2 text-center" style={{width: '60px'}}/>
        <FaPlus onClick={increaseQuantity}/>
        <StyledButton variant="primary" size="sm" onClick={addToCart}>
          Total: ${totalPrice} <FaShoppingCart /> 
        </StyledButton>
      </QuantityWrapper>
    </StyledContainer>
  );
};

export default ProductPurchase;

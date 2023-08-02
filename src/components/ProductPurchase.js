import React from 'react';
import { Button, FormControl, Card } from 'react-bootstrap';
import { FaShoppingCart, FaMinus, FaPlus } from 'react-icons/fa';
import styled from 'styled-components';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const StyledContainer = styled.div`
  margin-top: 20px;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
`;

const StyledButton = styled(Button)`
  margin-top: 20px;
`;

const ProductPurchase = ({ 
    product, 
    cart, 
    setCart, 
    quantity, 
    decreaseQuantity, 
    increaseQuantity, 
    totalPrice 
  }) => {
  
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
            <div className="d-flex align-items-center">
                <FaMinus onClick={decreaseQuantity}/>
                <FormControl type="number" value={quantity} readOnly className="mx-2 text-center" style={{width: '60px'}}/>
                <FaPlus onClick={increaseQuantity}/>
            </div>
            <Card.Text className="mt-3">
                Total: ${totalPrice}
            </Card.Text>
            <StyledButton variant="primary" size="sm" onClick={addToCart}>
                <FaShoppingCart /> Add to Cart
            </StyledButton>
        </StyledContainer>
    );
};

export default ProductPurchase;

import React from 'react';
import { Button, FormControl, Card } from 'react-bootstrap';
import { FaShoppingCart, FaMinus, FaPlus } from 'react-icons/fa';
import styled from 'styled-components';

const StyledContainer = styled.div`
  margin-top: 20px;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
`;

const StyledButton = styled(Button)`
  margin-top: 20px;
`;

const ProductPurchase = ({ quantity, decreaseQuantity, increaseQuantity, totalPrice }) => {
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
            <StyledButton variant="primary" size="sm">
                <FaShoppingCart /> Add to Cart
            </StyledButton>
        </StyledContainer>
    );
};

export default ProductPurchase;

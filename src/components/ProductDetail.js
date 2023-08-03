import { Card } from 'react-bootstrap';
import styled from 'styled-components';
import { useState } from 'react';
import { useClerk } from "@clerk/clerk-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StyledCard = styled(Card)`
  margin-top: 20px;
  padding: 20px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
`;

const PriceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ProductDetail = ({ name, unit, origin, price }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const { user } = useClerk(); 
  const navigate = useNavigate();

  const handleFavoriteClick = () => {
    if (user) {
      setIsFavorited(!isFavorited);
      toast(isFavorited ? 'Removed from favorites' : 'Added to favorites', { position: 'top-center' });
    } else {
      navigate('/sign-up');
    }
  };

  return (
    <StyledCard>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{unit}
        <div>Origin: {origin}</div></Card.Text>
        <Card.Text></Card.Text>
        <PriceContainer>
          <span>Price: <b>${price}</b></span>
          <FontAwesomeIcon
            icon={isFavorited ? solidStar : regularStar}
            onClick={handleFavoriteClick}
          />
        </PriceContainer>
      </Card.Body>
    </StyledCard>
  );
};

export default ProductDetail;

import { Card, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { useState } from 'react';
import { useClerk } from "@clerk/clerk-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import DatePicker from 'react-datepicker';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.css';
const StyledCard = styled(Card)`
  margin-top: 20px;
  padding: 20px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
`;

const StyledDatePicker = styled(DatePicker)`
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  color: #495057;
  padding: .375rem .75rem;
  line-height: 1.5;
  margin-left: 10px;
  width: auto;
  @media (min-width: 768px) and (max-width: 1010px) {
    width: 100%;
  }
`;



const ProductDetail = ({ name, unit, deliveryCountry, quantity, deliveryDate, price }) => {
  const [productQuantity, setProductQuantity] = useState(quantity);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const { user } = useClerk(); 


  const handleFavoriteClick = () => {
    if (user) {
      setIsFavorited(!isFavorited);
      toast(isFavorited ? 'Removed from favorites' : 'Added to favorites', { position: 'top-center' });
    }
  };
  const toggleFavorite = () => {
    setFavorite(!favorite);
    if (favorite) {
      toast('Removed from favorites');
    } else {
      toast('Added to favorites');
    }
  }
  return (
    <StyledCard>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text> {unit}</Card.Text>
        <Card.Text>Delivery Country: {deliveryCountry}</Card.Text>
        <div>Delivery Date: 
          <StyledDatePicker 
            selected={selectedDate} 
            onChange={(date) => setSelectedDate(date)}
            dateFormat="MMMM d, yyyy"
          />
        </div>
        <Card.Text>Price: ${price}</Card.Text>
        {user && (
          <FontAwesomeIcon
            icon={isFavorited ? solidStar : regularStar}
            onClick={handleFavoriteClick}
          />
        )}
      </Card.Body>
    </StyledCard>
  );
};

export default ProductDetail;

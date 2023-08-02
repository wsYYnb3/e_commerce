import { Card, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
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
`;



const ProductDetail = ({ name, unit, deliveryCountry, quantity, deliveryDate, price }) => {
  const [productQuantity, setProductQuantity] = useState(quantity);
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <StyledCard>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text> {unit}</Card.Text>
        <Card.Text>Delivery Country: {deliveryCountry}</Card.Text>
        <Card.Text>Delivery Date: 
          <StyledDatePicker 
            selected={selectedDate} 
            onChange={(date) => setSelectedDate(date)}
            dateFormat="MMMM d, yyyy"
          />
        </Card.Text>
        <Card.Text>Price: ${price}</Card.Text>
      </Card.Body>
    </StyledCard>
  );
};

export default ProductDetail;

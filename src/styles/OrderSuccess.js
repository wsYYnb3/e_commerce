import styled from "styled-components";
import { Button } from "react-bootstrap";

export const SuccessMessage = styled.h1`
  color: green;
  text-align: center;
  margin-top: 50px;
`;

export const OrderDetails = styled.div`
  margin: 20px;
  padding: 20px;
  border: 1px solid #ddd;
`;

export const OrderID = styled.p`
  font-size: 1.2em;
`;

export const Summary = styled.p`
  font-size: 1em;
`;

export const CTAButton = styled(Button)`
  margin-top: 20px;
`;

import { Card } from "react-bootstrap";
import styled from "styled-components";
import { FaRegSadTear } from "react-icons/fa";

export const NoOrdersContainer = styled.div`
  text-align: center;
  padding: 50px 20px;
  margin-top: 50px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f8f8f8;
`;

export const NoOrdersIcon = styled(FaRegSadTear)`
  color: #6c757d;
  font-size: 48px;
  margin-bottom: 20px;
`;

export const NoOrdersText = styled.h3`
  color: #333;
  margin-bottom: 15px;
`;

export const NoOrdersSubText = styled.p`
  color: #666;
`;
export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const OrderCard = styled(Card)`
  margin: 15px 0;
  padding: 15px;
`;

export const IconText = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  h5,
  h6,
  p {
    margin: 0;
  }
`;

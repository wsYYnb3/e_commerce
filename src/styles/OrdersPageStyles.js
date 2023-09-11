import { Card } from "react-bootstrap";
import styled from "styled-components";

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

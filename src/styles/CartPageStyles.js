import { ListGroup, Card } from "react-bootstrap";
import styled from "styled-components";
import "react-toastify/dist/ReactToastify.css";
export const StyledWrapper = styled.div`
  background-color: #f4f4f4;
  min-height: 100vh;
  padding: 50px 0;
`;

export const StyledCard = styled(Card)`
  background-color: #ffdb59;
  color: #333;
`;

export const StyledListGroupItem = styled(ListGroup.Item)`
  background-color: #f7f7f7;
`;

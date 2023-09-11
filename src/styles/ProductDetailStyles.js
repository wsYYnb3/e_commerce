import { Card } from "react-bootstrap";
import styled from "styled-components";
import "react-toastify/dist/ReactToastify.css";
import { FaStar } from "react-icons/fa";
export const StyledStar = styled(FaStar)`
  position: absolute;
  top: 10px;
  right: 10px;
  color: ${(props) => (props.favorite ? "gold" : "gray")};
  cursor: pointer;
  z-index: 2;
  font-size: 24px;

  &:hover {
    color: gold;
  }
`;

export const StyledCard = styled(Card)`
  margin-top: 20px;
  padding: 20px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
`;

export const PriceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

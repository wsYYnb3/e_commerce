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
  border: none;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  margin: 10px;

  &:hover {
    box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.2);
  }
  @media (min-width: 1400px) {
    max-width: 80%;
    align: center;
    margin-left: 20px;
    margin-right: 20px;
  }
  @media (max-width: 1400px) {
    width: 70%;
    align: center;
    margin-left: 20px;
    margin-right: 20px;
  }
  @media (max-width: 768px) {
    width: 70%;
    align: center;
  }
`;

export const PriceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

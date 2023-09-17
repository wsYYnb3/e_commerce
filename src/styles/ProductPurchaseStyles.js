import { Button } from "react-bootstrap";
import styled from "styled-components";
import "react-toastify/dist/ReactToastify.css";

export const StyledContainer = styled.div`
  margin-top: 20px;
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  @media (min-width: 1400px) {
    max-width: 80%;
    align: center;
    margin-left: 20px;
    margin-right: 20px;
  }
  @media (max-width: 1400px) {
    max-width: 70%;
    margin-left: 20px;
    margin-right: 20px;
  }
  @media (max-width: 768px) {
    max-width: 70%;
  }
  align-items: center;
`;

export const QuantityWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledButton = styled(Button)`
  margin-top: 0;
  margin-left: auto;
  display: block;

  @media (max-width: 768px) {
    max-height: 40px;
    margin-left: 10px;
  }

  ${(props) =>
    props.$isMobile &&
    `
    @media (max-width: 400px) {
      .button-text {
        display: none;
      }
      width: 30%;
    }
  `}
`;

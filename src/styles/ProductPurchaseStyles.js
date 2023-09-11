import { Button } from "react-bootstrap";
import styled from "styled-components";
import "react-toastify/dist/ReactToastify.css";

export const StyledContainer = styled.div`
  margin-top: 20px;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
`;

export const QuantityWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledButton = styled(Button)`
  margin-top: 0;
  margin-left: auto;
  display: block;
`;

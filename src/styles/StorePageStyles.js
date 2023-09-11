import styled from "styled-components";
import { Button } from "react-bootstrap";

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledResetButton = styled(Button)`
  border: none;
  padding: 10px;
  margin-left: 10px;
  cursor: pointer;
`;

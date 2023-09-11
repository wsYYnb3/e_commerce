import { Row, Form } from "react-bootstrap";
import styled from "styled-components";

export const FormRow = styled(Row)`
  @media (min-width: 576px) {
    display: flex;
    flex-wrap: wrap;
    margin-right: -5px;
    margin-left: -5px;
  }
`;
export const FormControl = styled(Form.Control)`
  font-size: 14px;
`;

export const FormLabel = styled(Form.Label)`
  font-size: small;
`;

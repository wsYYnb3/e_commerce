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

export const StyledSelect = styled(Form.Select)`
  width: 100%;
  padding: 0.375rem 1.75rem 0.375rem 0.75rem;
  border-radius: 0.25rem;
  border: 1px solid #ced4da;
`;

export const StyledOption = styled.option`
  padding: 0.5rem 1rem;
`;

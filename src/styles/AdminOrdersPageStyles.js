import styled from "styled-components";
import { Dropdown as BSDropdown, Button as BSButton } from "react-bootstrap";

export const StyledDropdown = styled(BSDropdown)`
  .dropdown-toggle {
    width: 150px;
    background-color: #f8f9fa !important;
    border-color: #ced4da !important;
    color: #495057 !important;
    border-radius: 4px;
    text-align: left;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.5rem;
  }

  .dropdown-menu {
    border-radius: 4px;
  }

  .dropdown-item {
    display: flex;
    align-items: center;

    svg {
      margin-right: 0.5rem;
    }
  }
`;

export const StyledButton = styled(BSButton)`
  background-color: #28a745 !important;
  border-color: #28a745 !important;
  border-radius: 4px;
  color: #fff !important;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:disabled {
    background-color: #6c757d !important;
    border-color: #6c757d !important;
  }
`;

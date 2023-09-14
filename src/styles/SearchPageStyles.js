import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "@emotion/styled";

export const StyledSearchIcon = styled(FontAwesomeIcon)`
  margin-right: 10px;
  color: #555;
`;

export const SearchBar = styled.div`
  position: relative;
  width: 100%;

  .react-autosuggest__input {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
    border: 2px solid #555;
    border-radius: 4px;
  }
`;

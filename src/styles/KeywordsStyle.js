import { Badge } from "react-bootstrap";
import styled from "styled-components";
import { Link } from "react-router-dom";
export const KeywordContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 60px;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;

  &:hover {
    text-decoration: none;
  }
`;

export const StyledBadge = styled(Badge)`
  font-size: 0.9em;
  padding: 8px 12px;
  background-color: #b0b0b0 !important;
  color: #000 !important;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #636363 !important;
  }
`;

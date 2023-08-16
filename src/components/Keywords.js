import React from "react";
import { Badge } from "react-bootstrap";
import styled from "styled-components";

const KeywordContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 60px;
`;

const StyledBadge = styled(Badge)`
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

const Keywords = ({ keywords }) => {
  return (
    <KeywordContainer>
      {keywords.map((keyword, index) => (
        <StyledBadge key={index}>{keyword}</StyledBadge>
      ))}
    </KeywordContainer>
  );
};

export default Keywords;

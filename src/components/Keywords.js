import React from "react";
import { Badge } from "react-bootstrap";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
const KeywordContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 60px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;

  &:hover {
    text-decoration: none;
  }
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
  const { language } = useParams();
  const { t } = useTranslation();
  return (
    <KeywordContainer>
      {keywords.map((keyword, index) => (
        <StyledLink
          key={keyword.id}
          to={`/${language}/search?q=${t(keyword.keyword_key)}`}
        >
          <StyledBadge>{t(keyword.keyword_key)}</StyledBadge>
        </StyledLink>
      ))}
    </KeywordContainer>
  );
};

export default Keywords;

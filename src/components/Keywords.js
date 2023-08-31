import React from "react";
import { Badge } from "react-bootstrap";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  KeywordContainer,
  StyledLink,
  StyledBadge,
} from "../styles/KeywordsStyle";

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

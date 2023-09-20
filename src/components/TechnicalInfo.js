import React from "react";
import { Col, Row } from "react-bootstrap";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { StyledCard } from "../styles/DescriptionStyles";

const TechnicalInfo = ({ data }) => {
  const { t } = useTranslation();
  const { language } = useParams();
  if (!data) {
    return null;
  }
  return (
    <div>
      <StyledCard>
        <Row className='m-2'>
          <h4>Technical Information</h4>
          {data.map((item) => (
            <Col md={6} key={item.id}>
              <ul>
                <li>{t(item.info_key)}</li>
              </ul>
            </Col>
          ))}
        </Row>
      </StyledCard>
    </div>
  );
};

export default TechnicalInfo;

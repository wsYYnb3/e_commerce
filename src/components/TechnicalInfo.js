import React from "react";
import { Col, Row } from "react-bootstrap";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const TechnicalInfo = ({ data }) => {
  const { t } = useTranslation();
  const { language } = useParams();
  if (!data) {
    return null;
  }
  return (
    <div>
      <Row className='mt-2'>
        <h4>Technical Information</h4>
        {data.map((item) => (
          <Col md={6} key={item.id}>
            <ul>
              <li>{t(item.info_key)}</li>
            </ul>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default TechnicalInfo;

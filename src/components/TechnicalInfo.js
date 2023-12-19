import React from "react";
import { Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { StyledCard } from "../styles/DescriptionStyles";

const TechnicalInfo = ({ data }) => {
  const { t } = useTranslation();

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

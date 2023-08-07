import React from "react";
import { Col, Row } from "react-bootstrap";
import styled from "styled-components";

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const TechnicalInfo = ({ data }) => {
  return (
    <div>
      <h4>Technical Information</h4>
      <Row>
        {data.map((item, index) => (
          <Col md={6} key={index}>
            <ul>
              <li>{item.value}</li>
            </ul>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default TechnicalInfo;

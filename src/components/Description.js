import React from "react";
import { Card } from "react-bootstrap";
import styled from "styled-components";
import { StyledCard } from "../styles/DescriptionStyles";
/*const StyledCard = styled(Card)`
  border: none;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  margin: 10px;
  &:hover {
    box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.2);
  }
`;*/

const Description = ({ description }) => {
  return (
    <StyledCard>
      <Card.Body>
        <h4>Description</h4>
        <p>{description}</p>
      </Card.Body>
    </StyledCard>
  );
};

export default Description;

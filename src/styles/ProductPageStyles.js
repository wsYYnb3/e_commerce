import { Col, Container } from "react-bootstrap";
import styled from "styled-components";

export const StyledCol = styled(Col)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledImageCol = styled(Col)`
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const ProductPageContainer = styled(Container)`
  padding: 20px;
`;

export const DescriptionTechnicalInfoContainer = styled.div`
  width: 90%;
  display: flex;
  justify-content: center;
  margin-left: 40px;
  align-items: center;
  @media (min-width: 768px) {
  }
`;

export const PageTitle = styled.h1`
  font-size: 2em;
  text-align: center;
  color: #333;
  margin: 20px 0;
  font-weight: bold;
`;
export const DetailPurchaseContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 768px) {
    align-items: flex-start;
  }
`;

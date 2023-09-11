import { Col, Container } from "react-bootstrap";
import styled from "styled-components";
//import ProductSpecification from '../components/ProductSpecification';
//import FarmerProfile from '../components/FarmerProfile';
//import FarmInformation from '../components/FarmInformation';
//import TechnicalInformation from '../components/TechnicalInformation';
export const StyledCol = styled(Col)`
  margin-bottom: 30px;

  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
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
  @media (min-width: 768px) {
    margin-left: 30px;
  }
`;

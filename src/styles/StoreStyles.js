import { Card, Row } from 'react-bootstrap';
import { FaSearch, FaStar } from 'react-icons/fa';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { animated } from 'react-spring';

export const SideBar = styled.div`
  border-right: 1px solid #ccc;
  padding: 1rem;
`;

export const SearchBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

export const SearchIcon = styled(FaSearch)`
  margin-right: 10px;
`;

export const StyledCard = styled(Card)`
  transition: 0.3s;
  &:hover {
    transform: scale(1.02);
  }
`;

export const ProductRow = styled(Row)`
  padding-top: 1rem;
`;

export const Star = styled(FaStar)`
  color: #ffc107;
  cursor: pointer;
`;

export const RadioLabel = styled(animated.label)`
  cursor: pointer;
`;

export const radioHighlight = keyframes`
  from {
    background-color: transparent;
  }
  to {
    background-color: #007bff;
  }
`;
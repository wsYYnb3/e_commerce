import React, { useState, useEffect } from 'react';
import { Card, Button, Col, Row, Container, Form, FormControl } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import { FaShoppingCart, FaMinus, FaPlus } from 'react-icons/fa';


export const StyledCard = styled(Card)`
    width: 100%;
  object-fit: cover;
  @media (min-width: 1025px) {
    height: 255px;
    width : 452px;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    height: 400px;  
    height: 255px;
  }

  @media (max-width: 767px) {
    height: 265px;
    width: 370px;
  &:hover {
    transform: scale(1.02);
    transition: transform .2s;
  }
`;

export const StyledImage = styled.img`
  width: 100%;
  object-fit: cover;
  @media (min-width: 1025px) {
    height: 555px;
    width : 452px;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    height: 400px;  // Adjust this as per your requirement for iPad
  }

  @media (max-width: 767px) {
    height: 265px;
    width: 370px;
  }
`;

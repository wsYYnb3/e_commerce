import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, FormText } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CartContext } from "../contexts/CartContext";
import styled from "styled-components";
import TextInput from "../components/TextInput";
import { schema } from "../services/validation";

export const FormRow = styled(Row)`
  @media (min-width: 576px) {
    display: flex;
    flex-wrap: wrap;
    margin-right: -5px;
    margin-left: -5px;
  }
`;
export const FormControl = styled(Form.Control)`
  font-size: 14px;
`;

export const FormLabel = styled(Form.Label)`
  font-size: small;
`;

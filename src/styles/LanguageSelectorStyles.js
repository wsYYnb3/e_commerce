import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ReactCountryFlag from "react-country-flag";

export const FlagWithRef = React.forwardRef((props, ref) => (
  <div ref={ref}>
    <ReactCountryFlag {...props} />
  </div>
));

export const StyledReactCountryFlag = styled(FlagWithRef)`
  cursor: pointer;
  font-size: 1.4em;
`;

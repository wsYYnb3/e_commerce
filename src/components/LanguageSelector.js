import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ReactCountryFlag from "react-country-flag";

const FlagWithRef = React.forwardRef((props, ref) => (
  <div ref={ref}>
    <ReactCountryFlag {...props} />
  </div>
));

const StyledReactCountryFlag = styled(FlagWithRef)`
  cursor: pointer;
  font-size: 1.4em;
`;

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const [selectedFlag, setSelectedFlag] = useState("US");

  const changeLanguage = (language, flag) => {
    i18n.changeLanguage(language);
    setSelectedFlag(flag);
    navigate(`/${language}`);
  };

  return (
    <Dropdown>
      <Dropdown.Toggle
        as={StyledReactCountryFlag}
        countryCode={selectedFlag}
        svg
        id='dropdown-basic'
      />
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => changeLanguage("en", "US")}>
          <ReactCountryFlag countryCode='US' svg /> English
        </Dropdown.Item>
        <Dropdown.Item onClick={() => changeLanguage("es", "ES")}>
          <ReactCountryFlag countryCode='ES' svg /> Spanish
        </Dropdown.Item>
        <Dropdown.Item onClick={() => changeLanguage("fr", "FR")}>
          <ReactCountryFlag countryCode='FR' svg /> French
        </Dropdown.Item>
        <Dropdown.Item onClick={() => changeLanguage("de", "DE")}>
          <ReactCountryFlag countryCode='DE' svg /> German
        </Dropdown.Item>
        <Dropdown.Item onClick={() => changeLanguage("he", "IL")}>
          <ReactCountryFlag countryCode='IL' svg /> Hebrew
        </Dropdown.Item>
        <Dropdown.Item onClick={() => changeLanguage("hu", "HU")}>
          <ReactCountryFlag countryCode='HU' svg /> Hungarian
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LanguageSelector;

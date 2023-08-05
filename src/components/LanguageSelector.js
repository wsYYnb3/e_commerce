import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import styled from "styled-components";
import FlagIconFactory from "react-flag-icon-css";
import i18 from "i18next";

const FlagIconComponent = FlagIconFactory(React, { useCssModules: false });

const LanguageFlag = React.forwardRef(({ code, className, ...props }, ref) => (
  <div {...props} ref={ref}>
    <FlagIconComponent code={code} className={className} />
  </div>
));

const StyledLanguageFlag = styled(LanguageFlag)`
  cursor: pointer;
`;

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [selectedFlag, setSelectedFlag] = useState("us");

  const changeLanguage = (language, flag) => {
    i18n.changeLanguage(language);
    setSelectedFlag(flag);
  };

  return (
    <Dropdown>
      <Dropdown.Toggle
        as={StyledLanguageFlag}
        code={selectedFlag}
        size='lg'
        id='dropdown-basic'
      />
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => changeLanguage("en", "us")}>
          <FlagIconComponent code='us' size='lg' /> English
        </Dropdown.Item>
        <Dropdown.Item onClick={() => changeLanguage("es", "es")}>
          <FlagIconComponent code='es' size='lg' /> Spanish
        </Dropdown.Item>
        {/* Other languages... */}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LanguageSelector;

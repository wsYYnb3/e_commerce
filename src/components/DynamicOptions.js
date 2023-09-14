import React from "react";

import { Form } from "react-bootstrap";
const DynamicOptions = ({ options, onChange }) => {
  return (
    <Form.Select onChange={onChange}>
      {options.map((option, index) => (
        <option key={index} value={index}>
          {`${option.street}, ${option.city}, ${option.state}`}
        </option>
      ))}
    </Form.Select>
  );
};

export default DynamicOptions;

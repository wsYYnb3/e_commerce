import React from 'react';
import { Form } from 'react-bootstrap';
import { Controller } from 'react-hook-form';
import styled from 'styled-components';

const FormControl = styled(Form.Control)`
  font-size: 14px;
`;

const FormLabel = styled(Form.Label)`
  font-size: small;
`;

const StyledFeedback = styled(Form.Control.Feedback)`
  display: block; // ensures error message is always displayed
`;

const TextInput = ({ label, name, control, rules, defaultValue, formState: { errors } }) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field }) => (
        <Form.Group>
          <FormLabel>{label}</FormLabel>
          <FormControl
            {...field}
            isInvalid={!!errors[name]}
          />
          {errors[name] && (
            <StyledFeedback type="invalid">
              {errors[name]?.message}
            </StyledFeedback>
          )}
        </Form.Group>
      )}
    />
  );
};

export default TextInput;

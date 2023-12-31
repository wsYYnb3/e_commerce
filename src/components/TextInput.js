import React from "react";
import { Form } from "react-bootstrap";
import { Controller } from "react-hook-form";
import _ from "lodash";
import { FormControl, FormLabel } from "../styles/TextInputStyles";

const TextInput = ({
  label,
  name,
  control,
  rules,
  defaultValue,
  formState: { errors },
}) => {
  const error = _.get(errors, name);

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field }) => (
        <Form.Group>
          <FormLabel>{label}</FormLabel>
          <FormControl {...field} isInvalid={!!error} />
          {error && (
            <Form.Control.Feedback type='invalid'>
              {error.message}
            </Form.Control.Feedback>
          )}
        </Form.Group>
      )}
    />
  );
};

export default TextInput;

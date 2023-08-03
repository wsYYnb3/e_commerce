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

const FormRow = styled(Row)`
  @media (min-width: 576px) {
    display: flex;
    flex-wrap: wrap;
    margin-right: -5px;
    margin-left: -5px;
  }
`;
const FormControl = styled(Form.Control)`
  font-size: 14px;
`;

const FormLabel = styled(Form.Label)`
  font-size: small;
`;

const CheckoutPage = () => {
  const { control, handleSubmit, watch, formState } = useForm({
    resolver: yupResolver(schema),
  });
  const [cart] = useContext(CartContext);

  const history = useNavigate();
  const isDeliveryAddressDifferent = watch("isDeliveryAddressDifferent", false);

  const onSubmit = (data) => {
    console.log("Order submitted", data);
  };

  return (
    <Container>
      <Row>
        <Col xs={12} md={8}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <h3>Billing Details</h3>
            <FormRow>
              <Col xs={8} md={6}>
                <TextInput
                  label='First Name'
                  name='billingDetails.firstName'
                  control={control}
                  rules={{ required: true }}
                  defaultValue=''
                  formState={formState}
                />
              </Col>
              <Col xs={8} md={6}>
                <TextInput
                  label='Last Name'
                  name='billingDetails.lastName'
                  control={control}
                  rules={{ required: true }}
                  defaultValue=''
                  formState={formState}
                />
              </Col>
            </FormRow>
            <FormRow>
              <Col xs={8} md={6}>
                <TextInput
                  label='Email'
                  name='billingDetails.email'
                  control={control}
                  rules={{ required: true }}
                  defaultValue=''
                  formState={formState}
                />
              </Col>
            </FormRow>
            <FormRow className='mb-3'>
              <Col xs={2} md={2}>
                <TextInput
                  label='Area'
                  name='billingDetails.phone.countryCode'
                  control={control}
                  rules={{ required: true }}
                  defaultValue='+'
                  formState={formState}
                />
              </Col>
              <Col xs={6} md={4}>
                <TextInput
                  label='Phone Number'
                  name='billingDetails.phone.number'
                  control={control}
                  rules={{ required: true }}
                  defaultValue=''
                  formState={formState}
                />
              </Col>
            </FormRow>
            <h4>Billing Address</h4>
            <FormRow>
              <Col xs={8} md={6}>
                <TextInput
                  label='Street'
                  name='billingDetails.address.street'
                  control={control}
                  rules={{ required: true }}
                  defaultValue=''
                  formState={formState}
                />
              </Col>
              <Col xs={2} md={3}>
                <TextInput
                  label='Number'
                  name='billingDetails.address.number'
                  control={control}
                  rules={{ required: true }}
                  defaultValue=''
                  formState={formState}
                />
              </Col>
              <Col xs={4} md={3}>
                <TextInput
                  label='Apt (Optional)'
                  name='billingDetails.address.apt'
                  control={control}
                  defaultValue=''
                  formState={formState}
                />
              </Col>
            </FormRow>
            <FormRow className='mb-3'>
              <Col xs={6} md={6}>
                <TextInput
                  label='City'
                  name='billingDetails.address.city'
                  control={control}
                  rules={{ required: true }}
                  defaultValue=''
                  formState={formState}
                />
              </Col>
              <Col xs={6} md={3}>
                <TextInput
                  label='State'
                  name='billingDetails.address.state'
                  control={control}
                  rules={{ required: true }}
                  defaultValue=''
                  formState={formState}
                />
              </Col>
              <Col md={3} xs={6}>
                <TextInput
                  label='Country'
                  name='billingDetails.address.country'
                  control={control}
                  rules={{ required: true }}
                  defaultValue=''
                  formState={formState}
                />
              </Col>
              <Col xs={3} md={3}>
                <TextInput
                  label='ZIP Code'
                  name='billingDetails.address.zip'
                  control={control}
                  rules={{ required: true }}
                  defaultValue=''
                  formState={formState}
                />
              </Col>
            </FormRow>

            <Form.Group className='mb-2'>
              <Form.Check
                label='Delivery address is different'
                {...control.register("isDeliveryAddressDifferent")}
              />
            </Form.Group>

            {isDeliveryAddressDifferent && (
              <>
                <h4>Delivery Details</h4>
                <FormRow>
                  <Col xs={8} md={6}>
                    <TextInput
                      label='Street'
                      name='deliveryDetails.address.street'
                      control={control}
                      rules={{ required: true }}
                      defaultValue=''
                      formState={formState}
                    />
                  </Col>
                  <Col xs={2} md={3}>
                    <TextInput
                      label='Number'
                      name='deliveryDetails.address.number'
                      control={control}
                      rules={{ required: true }}
                      defaultValue=''
                      formState={formState}
                    />
                  </Col>
                  <Col xs={3} md={3}>
                    <TextInput
                      label='Apt (Optional)'
                      name='deliveryDetails.address.apt'
                      control={control}
                      defaultValue=''
                      formState={formState}
                    />
                  </Col>
                </FormRow>
                <FormRow className='mb-4'>
                  <Col xs={6} md={6}>
                    <TextInput
                      label='City'
                      name='deliveryDetails.address.city'
                      control={control}
                      rules={{ required: true }}
                      defaultValue=''
                      formState={formState}
                    />
                  </Col>
                  <Col xs={6} md={3}>
                    <TextInput
                      label='State'
                      name='deliveryDetails.address.state'
                      control={control}
                      rules={{ required: true }}
                      defaultValue=''
                      formState={formState}
                    />
                  </Col>
                  <Col md={3} xs={6}>
                    <TextInput
                      label='Country'
                      name='deliveryDetails.address.country'
                      control={control}
                      rules={{ required: true }}
                      defaultValue=''
                      formState={formState}
                    />
                  </Col>
                  <Col xs={6} md={3}>
                    <TextInput
                      label='ZIP Code'
                      name='deliveryDetails.address.zip'
                      control={control}
                      rules={{ required: true }}
                      defaultValue=''
                      formState={formState}
                    />
                  </Col>
                </FormRow>
              </>
            )}

            {/* Payment Method fields... */}
            {/* Submit Button */}
            <Button type='submit'>Submit Order</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CheckoutPage;

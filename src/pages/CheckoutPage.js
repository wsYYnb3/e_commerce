import React,{useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { CartContext } from "../contexts/CartContext";
import styled from 'styled-components';
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
const schema = yup.object().shape({
    billingDetails: yup.object().shape({
      firstName: yup.string().required('First name is required'),
      lastName: yup.string().required('Last name is required'),
      email: yup.string().email('Invalid email address').required('Email is required'),
      phone: yup.object().shape({
        countryCode: yup.string().required('Country code is required'),
        carrierCode: yup.string().required('Carrier code is required'),
        number: yup.string().matches(/^[0-9]$/, 'Phone number is not valid').required('Phone number is required'),
      }),
      address: yup.object().shape({
        street: yup.string().required('Street is required'),
        apt: yup.string(),
        city: yup.string().required('City is required'),
        state: yup.string().required('State is required'),
        zip: yup.string().matches(/^[0-9]{4,5}$/, 'ZIP code is not valid').required('ZIP code is required'),
      }),
    }),
    isDeliveryAddressDifferent: yup.boolean(),
    deliveryDetails: yup.object().shape({
        address: yup.object().shape({
            street: yup.string().required('Street is required'),
            apt: yup.string(),
            city: yup.string().required('City is required'),
            state: yup.string().required('State is required'),
            zip: yup.string().matches(/^[0-9]{4,5}$/, 'ZIP code is not valid').required('ZIP code is required'),
          }),
    }),
    paymentMethod: yup.string().required('Payment method is required'),
  });
  

const TextInput = ({ label, name, control, rules, defaultValue }) => (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field }) => (
        <Form.Group>
          <FormLabel>{label}</FormLabel>
          <FormControl {...field} />
        </Form.Group>
      )}
    />
  );

const CheckoutPage = () => {
  const { control, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const [cart] = useContext(CartContext);

  const history = useNavigate();
  const isDeliveryAddressDifferent = watch('isDeliveryAddressDifferent', false);

  const onSubmit = (data) => {
    console.log('Order submitted', data);
    history.push('/success');
  };

  return (
    <Container>
      <Row>
        <Col xs={12} md={8}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <h3>Billing Details</h3>
            <FormRow>
              <Col md={6}>
                <TextInput
                  label="First Name"
                  name="billingDetails.firstName"
                  control={control}
                  rules={{ required: true }}
                  defaultValue=""
                />
              </Col>
              <Col md={6}>
                <TextInput
                  label="Last Name"
                  name="billingDetails.lastName"
                  control={control}
                  rules={{ required: true }}
                  defaultValue=""
                />
              </Col>
            </FormRow>
            <FormRow>
              <Col md={6}>
                <TextInput
                  label="Email"
                  name="billingDetails.email"
                  control={control}
                  rules={{ required: true }}
                  defaultValue=""
                />
              </Col>
            </FormRow>
            <FormRow className='mb-3'>
              <Col md={2}>
                <TextInput
                  label="Country Code"
                  name="billingDetails.phone.countryCode"
                  control={control}
                  rules={{ required: true }}
                  defaultValue=""
                />
              </Col>
              <Col md={4}>
                <TextInput
                  label="Phone Number"
                  name="billingDetails.phone.number"
                  control={control}
                  rules={{ required: true }}
                  defaultValue=""
                />
              </Col>
            </FormRow>
            <h4>Billing Address</h4>
            <FormRow>
              <Col md={6}>
                <TextInput
                  label="Street"
                  name="billingDetails.address.street"
                  control={control}
                  rules={{ required: true }}
                  defaultValue=""
                />
              </Col>
              <Col md={3}>
                <TextInput
                  label="Number"
                  name="billingDetails.address.number"
                  control={control}
                  rules={{ required: true }}
                  defaultValue=""
                />
              </Col>
              <Col md={3}>
                <TextInput
                  label="Apt (Optional)"
                  name="billingDetails.address.apt"
                  control={control}
                  defaultValue=""
                />
              </Col>
            </FormRow>
            <FormRow className='mb-3'>
              <Col md={6}>
                <TextInput
                  label="City"
                  name="billingDetails.address.city"
                  control={control}
                  rules={{ required: true }}
                  defaultValue=""
                />
              </Col>
              <Col md={3}>
                <TextInput
                  label="State"
                  name="billingDetails.address.state"
                  control={control}
                  rules={{ required: true }}
                  defaultValue=""
                />
              </Col>
              <Col md={3}>
                <TextInput
                  label="ZIP Code"
                  name="billingDetails.address.zip"
                  control={control}
                  rules={{ required: true }}
                  defaultValue=""
                />
              </Col>
            </FormRow>

            <Form.Group className='mb-2'>
              <Form.Check
                label="Delivery address is different"
                {...control.register('isDeliveryAddressDifferent')}
              />
            </Form.Group>

            {isDeliveryAddressDifferent && (
              <>
                <h4>Delivery Details</h4>
                <FormRow>
              <Col md={6}>
                <TextInput
                  label="Street"
                  name="billingDetails.address.street"
                  control={control}
                  rules={{ required: true }}
                  defaultValue=""
                />
              </Col>
              <Col md={3}>
                <TextInput
                  label="Number"
                  name="billingDetails.address.number"
                  control={control}
                  rules={{ required: true }}
                  defaultValue=""
                />
              </Col>
              <Col md={3}>
                <TextInput
                  label="Apt (Optional)"
                  name="billingDetails.address.apt"
                  control={control}
                  defaultValue=""
                />
              </Col>
            </FormRow>
            <FormRow className='mb-4'>
              <Col md={6}>
                <TextInput
                  label="City"
                  name="billingDetails.address.city"
                  control={control}
                  rules={{ required: true }}
                  defaultValue=""
                />
              </Col>
              <Col md={3}>
                <TextInput
                  label="State"
                  name="billingDetails.address.state"
                  control={control}
                  rules={{ required: true }}
                  defaultValue=""
                />
              </Col>
              <Col md={3}>
                <TextInput
                  label="ZIP Code"
                  name="billingDetails.address.zip"
                  control={control}
                  rules={{ required: true }}
                  defaultValue=""
                />
              </Col>
            </FormRow>
              </>
            )}

            {/* Payment Method fields... */}
            {/* Submit Button */}
            <Button type="submit" >Submit Order</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CheckoutPage;

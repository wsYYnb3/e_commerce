import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import TextInput from "../components/TextInput";
import { schema } from "../services/validation";
import { FormRow } from "../styles/CheckoutPageStyles";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { sendOrder } from "../services/ordersSlice";
import { getCurrencyDetails, calculateSubtotal } from "../utils/utils";
import { clearCart } from "../services/cartSlice";
import { useClerk } from "@clerk/clerk-react";
import { fetchCart } from "../services/cartSlice";
import {
  fetchBillingAddress,
  fetchShippingAddress,
} from "../services/addressSlice";
import DynamicOptions from "../components/DynamicOptions";
import { getImageById, getClerkUserDetails } from "../utils/utils";
const CheckoutPage = () => {
  const { language } = useParams();
  const cart = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const billingAdresses = useSelector(
    (state) => state.address.billingAddresses
  );
  const shippingAdresses = useSelector(
    (state) => state.address.shippingAddresses
  );
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const { control, handleSubmit, watch, formState, setValue } = useForm({
    resolver: yupResolver(schema),
  });
  const { currencyId, symbol } = getCurrencyDetails(language);
  const subtotal = calculateSubtotal(cart, currencyId, symbol);

  const navigate = useNavigate();

  const { user } = useClerk();
  const [imageSrc, setImageSrc] = useState(null);
  const customerId = user?.id;
  useEffect(() => {
    if (customerId) {
      dispatch(fetchCart(customerId));
      dispatch(fetchBillingAddress(customerId));
      dispatch(fetchShippingAddress(customerId));
    }
  }, [dispatch, customerId]);
  useEffect(() => {
    const fetchUserDetails = async () => {
      if (customerId) {
        try {
          const resp = await getClerkUserDetails(customerId);

          setValue("billingDetails.name", resp.name || "");
          setValue("billingDetails.email", resp.email || "");

          if (resp.phone) {
            const x = resp.phone.length - 9;

            const countryCodeAndCarrier =
              x > 0 ? resp.phone.substring(0, x) : "";

            const lastNineDigits = resp.phone.substring(x);
            setValue(
              "billingDetails.phone.countryCode",
              countryCodeAndCarrier || ""
            );
            setValue("billingDetails.phone.number", lastNineDigits || "");
          }
        } catch (error) {
          console.error("Failed to fetch user details:", error);
        }
      }
    };

    fetchUserDetails();
  }, [dispatch, customerId, setValue]);

  /* <Col xs={2} md={2}>
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
</Col>*/
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const image = getImageById(37);
        setImageSrc(image);
      } catch (error) {
        console.error("Failed to fetch image:", error);
      }
    };

    fetchImage();
  }, []);

  const isDeliveryAddressSame = watch("isDeliveryAddressSame", true);
  const entityType = watch("entityType", "privatePerson");
  const onSubmit = async (data) => {
    const payload = {
      ...data,
      cart,
      customerId,
      currencyId,
      total: subtotal,
    };
    try {
      const resp = await dispatch(sendOrder(payload)).unwrap();

      const orderId = resp.id;
      dispatch(clearCart(customerId));
      navigate(`order-summary/${orderId}`);
    } catch (error) {
      console.error("Failed to send order:", error);
    }
  };
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedDeliveryAddress, setSelectedDeliveryAddress] = useState(null);
  useEffect(() => {
    if (selectedAddress !== null) {
      const address = billingAdresses[selectedAddress];
      if (address) {
        setValue("billingDetails.address.street", address?.street || "");
        setValue("billingDetails.address.number", address?.num || "");
        setValue("billingDetails.address.apt", address?.apt || "");
        setValue("billingDetails.address.city", address?.city || "");
        setValue("billingDetails.address.state", address?.state || "");
        setValue("billingDetails.address.country", address?.country || "");
        setValue("billingDetails.address.zip", address?.zip || "");
      }
    }
  }, [selectedAddress, setValue, billingAdresses]);

  const handleAddressChange = (e) => {
    setSelectedAddress(e.target.value);
  };
  const handleDeliveryAddressChange = (e) => {
    setSelectedDeliveryAddress(e.target.value);
  };
  useEffect(() => {
    if (selectedDeliveryAddress !== null) {
      const address = billingAdresses[selectedDeliveryAddress];
      if (address) {
        setValue("deliveryDetails.address.street", address?.street || "");
        setValue("deliveryDetails.address.number", address?.num || "");
        setValue("deliveryDetails.address.apt", address?.apt || "");
        setValue("deliveryDetails.address.city", address?.city || "");
        setValue("deliveryDetails.address.state", address?.state || "");
        setValue("deliveryDetails.address.country", address?.country || "");
        setValue("deliveryDetails.address.zip", address?.zip || "");
      }
    }
  }, [selectedDeliveryAddress, setValue, billingAdresses]);

  return (
    <Container>
      <Row>
        <Col xs={12} md={8}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <h3>Billing Details</h3>
            <FormRow>
              <Col xs={8} md={6}>
                <TextInput
                  label='Name'
                  name='billingDetails.name'
                  control={control}
                  rules={{ required: true }}
                  defaultValue=''
                  formState={formState}
                />
              </Col>
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
              <Col>
                <Form.Group className='mt-3'>
                  <Form.Check
                    label='Private Person'
                    name='billingDetails.entityType'
                    type='radio'
                    id='privatePerson'
                    value='privatePerson'
                    defaultChecked
                    {...control.register("entityType")}
                  />
                  <Form.Check
                    label='Company'
                    name='billingDetails.entityType'
                    type='radio'
                    id='company'
                    value='company'
                    {...control.register("entityType")}
                  />
                </Form.Group>
              </Col>
            </FormRow>
            <h4>Billing Address</h4>
            <Col xs={8} md={6}>
              <FormRow>
                {billingAdresses.length > 0 && (
                  <DynamicOptions
                    options={billingAdresses}
                    onChange={handleAddressChange}
                  />
                )}
              </FormRow>
            </Col>
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
              {entityType === "company" && (
                <Col xs={8} md={6}>
                  <TextInput
                    label='Tax Number'
                    name='billingDetails.taxNumber'
                    control={control}
                    rules={{ required: true }}
                    defaultValue=''
                    formState={formState}
                  />
                </Col>
              )}
            </FormRow>

            <Form.Group className='mb-2'>
              <Form.Check
                label='Delivery address is the same'
                {...control.register("isDeliveryAddressSame")}
                defaultChecked
              />
            </Form.Group>

            {!isDeliveryAddressSame && (
              <>
                <h4>Delivery Details</h4>
                <Col xs={8} md={6}>
                  <FormRow>
                    {shippingAdresses.length > 0 && (
                      <DynamicOptions
                        options={shippingAdresses}
                        onChange={handleDeliveryAddressChange}
                      />
                    )}
                  </FormRow>
                </Col>
                <FormRow>
                  <Col xs={8} md={6}>
                    <TextInput
                      label='Name'
                      name='deliveryDetails.name'
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
            <Button type='submit'>Submit Order</Button>
          </Form>
        </Col>
        {windowWidth > 768 && imageSrc && (
          <Col xs={12} md={4} className='image-column'>
            <img
              src={imageSrc}
              width='300rem'
              alt='Descriptive alt text'
              className='checkout-image'
            />
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default CheckoutPage;

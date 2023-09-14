import * as yup from "yup";

export const schema = yup.object().shape({
  billingDetails: yup.object().shape({
    entityType: yup.string(),
    // .required("Please select entity type")
    //  .oneOf(["privatePerson", "company"], "Please select valid entity type"),
    name: yup.string().required("Name is required"),
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: yup.object().shape({
      countryCode: yup
        .string()
        .matches(/^\+?\d{1,3}$/, "International country code not valid ")
        .required("Area code is required"),
      number: yup
        .string()
        .matches(/^[0-9]+$/, "Phone number is not valid")
        .required("Phone number is required"),
    }),
    address: yup.object().shape({
      street: yup.string().required("Street is required"),
      number: yup
        .string()
        .matches(/^[0-9]+$/, "Street number is not valid")
        .required("Street number is required"),
      apt: yup.string(),
      city: yup.string().required("City is required"),
      country: yup.string().required("Country is required"),
      state: yup.string().required("State is required"),
      zip: yup
        .string()
        .matches(/^[0-9]{4,5}$/, "ZIP code is not valid")
        .required("ZIP code is required"),
    }),
  }),
  deliveryDetails: yup.object().shape({
    name: yup.string().when("isDeliveryAddressSame", {
      is: false,
      then: () => yup.string().required("Name is required"),
      otherwise: () => yup.string(),
    }),
    address: yup.object().shape({
      street: yup.string().when("isDeliveryAddressSame", {
        is: false,
        then: () => yup.string().required("Street is required"),
        otherwise: () => yup.string(),
      }),
      number: yup.string().when("isDeliveryAddressSame", {
        is: false,
        then: () =>
          yup
            .string()
            .matches(/^[0-9]+$/, "Street number is not valid")
            .required("Street number is required"),
        otherwise: () => yup.string(),
      }),
      apt: yup.string().when("isDeliveryAddressSame", {
        is: false,
        then: () => yup.string().required("Apartment number is required"),
        otherwise: () => yup.string(),
      }),
      city: yup.string().when("isDeliveryAddressSame", {
        is: false,
        then: () => yup.string().required("City is required"),
        otherwise: () => yup.string(),
      }),
      state: yup.string().when("isDeliveryAddressSame", {
        is: false,
        then: () => yup.string().required("State is required"),
        otherwise: () => yup.string(),
      }),
      country: yup.string().when("isDeliveryAddressSame", {
        is: false,
        then: () => yup.string().required("Country is required"),
        otherwise: () => yup.string(),
      }),
      zip: yup.string().when("isDeliveryAddressSame", {
        is: false,
        then: () =>
          yup
            .string()
            .matches(/^[0-9]{4,5}$/, "ZIP code is not valid")
            .required("ZIP code is required"),
        otherwise: () => yup.string(),
      }),
    }),
  }),
});
//paymentMethod: yup.string().required("Payment method is required"),

import * as yup from "yup";

export const schema = yup.object().shape({
  billingDetails: yup.object().shape({
    entityType: yup
      .string()
      .required("Please select entity type")
      .oneOf(["privatePerson", "company"], "Please select valid entity type"),
    name: yup.string().required("Name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: yup.object().shape({
      countryCode: yup
        .string()
        .matches(/^\+?\d{1,3}$/, "International country code not valid ")
        .required("Area code is required"),
      carrierCode: yup.string().required("Carrier code is required"),
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
  isDeliveryAddressDifferent: yup.boolean(),
  deliveryDetails: yup.object().shape({
    name: yup.string().required("Name is required"),
    address: yup.object().shape({
      street: yup.string().required("Street is required"),
      number: yup
        .string()
        .matches(/^[0-9]+$/, "Street number is not valid")
        .required("Street number is required"),
      apt: yup.string(),
      city: yup.string().required("City is required"),
      country: yup.string().required("State is required"),
      state: yup.string().required("State is required"),
      zip: yup
        .string()
        .matches(/^[0-9]{4,5}$/, "ZIP code is not valid")
        .required("ZIP code is required"),
    }),
  }),
  paymentMethod: yup.string().required("Payment method is required"),
});

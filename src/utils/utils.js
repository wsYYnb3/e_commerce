import axios from "axios";
import { v4 as uuidv4 } from "uuid";
export const getCurrencyDetails = (language) => {
  switch (language) {
    case "he":
      return { currencyId: 2, symbol: "ILS" };
    case "hu":
      return { currencyId: 3, symbol: "HUF" };
    default:
      return { currencyId: 1, symbol: "EUR" };
  }
};
export const getCurrencySymbol = (currencyId) => {
  switch (currencyId) {
    case 2:
      return "ILS";
    case 3:
      return "HUF";
    case 1:
      return "EUR";
    default:
      return "";
  }
};
export const getDisplayPrice = (product, currencyId) => {
  if (!product || !product.productpriceincurrencies) {
    console.warn("Undefined product or productpriceincurrencies", { product });
    return 0;
  }

  const productPriceInCurrency = product.productpriceincurrencies.find(
    (price) => price.currency_id === currencyId
  );

  return productPriceInCurrency ? parseFloat(productPriceInCurrency.price) : 0;
};
export const formatAddress = (address) => {
  if (!address) return "N/A";
  return [
    address.street,
    address.num,
    address.apt,
    address.city,
    address.state,
    address.zip,
    address.country,
  ]
    .filter(Boolean)
    .join(", ");
};
export const formatPrice = (price, symbol) => {
  return `${price} ${symbol}`;
};
export async function verifyAdmin(id) {
  let actualId = id;
  if (actualId) {
    try {
      if (typeof actualId === "object") {
        //ticket

        actualId = actualId.id;
      }

      const resp = await axios.get(
        `${process.env.REACT_APP_BACKEND_ADDRESS}/verify/${actualId}`
      );
      if (resp.data.id) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      //console.log(error);
      return false;
    }
  } else {
    return false;
  }
}
export async function sendTicket(data) {
  try {
    data.customerId = data.customerId || getOrCreateCustomerId();
    const resp = await axios.post(`api/ticket/add/${data.customerId}`, data, {
      withCredentials: true,
    });

    return resp;
  } catch (error) {
    console.error("Failed to send ticket:", error);
    throw error;
  }
}
export async function getClerkUserDetails(customerId) {
  try {
    const resp = await axios.get(
      `${process.env.REACT_APP_BACKEND_ADDRESS}/api/customer/get_clerk/${customerId}`,
      { params: { customerId }, withCredentials: true }
    );

    return resp.data;
  } catch (error) {
    console.error("Failed to get user details:", error);
    throw error;
  }
}
export async function getAllTicketsID() {
  try {
    const resp = await axios.get(`api/ticket/get/all_ids`);
    return resp;
  } catch (error) {
    console.error("Failed to send ticket:", error);
    throw error;
  }
}
export const getOrCreateCustomerId = () => {
  let customerId = localStorage.getItem("guestCustomerId") || uuidv4();
  localStorage.setItem("guestCustomerId", customerId);
  return customerId;
};
export async function getAllOrdersID() {
  try {
    const resp = await axios.get(
      `${process.env.REACT_APP_BACKEND_ADDRESS}/orders/get/all/id`
    );
    return resp;
  } catch (error) {
    console.error("Failed to send ticket:", error);
    throw error;
  }
}
export const getImageById = (id) => {
  if (id) {
    return `${process.env.REACT_APP_BACKEND_ADDRESS}/images/${id}`;
  }
};
export const calculateSubtotal = (cart, currencyId, symbol) => {
  return cart.reduce((acc, item) => {
    const displayPrice = parseFloat(
      getDisplayPrice(item.product, currencyId, symbol)
    );
    return acc + displayPrice * item.quantity;
  }, 0);
};
export const getComparisonFunction = (sortKey, currencyId, t) => {
  switch (sortKey) {
    case "low":
      return (a, b) =>
        getDisplayPrice(a, currencyId) - getDisplayPrice(b, currencyId);
    case "high":
      return (a, b) =>
        getDisplayPrice(b, currencyId) - getDisplayPrice(a, currencyId);
    case "name":
      return (a, b) => t(a.name_key).localeCompare(t(b.name_key));
    case "newest":
      return (a, b) => new Date(b.createdAt) - new Date(a.createdAt);
    default:
      return (a, b) => 0; // Default no sort
  }
};

import axios from "axios";
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

export const formatPrice = (price, symbol) => {
  return `${price} ${symbol}`;
};
export async function verifyAdmin(id) {
  try {
    const resp = await axios.get(`http://localhost:5000/admin/verify/${id}`);
    if (resp.data.id) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("error in admin verificiation");
    throw error;
  }
}
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

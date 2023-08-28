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
export const getDisplayPrice = (product, currencyId) => {
  const productPriceInCurrency = product.productpriceincurrencies
    ? product.productpriceincurrencies.find(
        (price) => price.currency_id === currencyId
      )
    : null;

  return productPriceInCurrency ? parseFloat(productPriceInCurrency.price) : 0;
};

export const formatPrice = (price, symbol) => {
  return `${price} ${symbol}`;
};

export const calculateSubtotal = (cart, currencyId, symbol) => {
  return cart.reduce((acc, item) => {
    const displayPrice = parseFloat(getDisplayPrice(item, currencyId, symbol));
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

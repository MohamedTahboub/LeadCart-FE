import currencies from 'data/currencies';


export const getCurrencySymbol = (code = 'USD') => {
  const currency = currencies.find((c) => c.code === code);

  return currency ? currency.symbol : code;
};

export const getPriceFormat = (price = 0, currency = 'USD') => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  });

  return formatter.format(price);
};


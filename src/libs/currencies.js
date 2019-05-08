import currencies from 'data/currencies';


export const getCurrencySymbol = (code) => {
  const currency = currencies.find((c) => c.code === code);

  return currency ? currency.symbol : code;
};

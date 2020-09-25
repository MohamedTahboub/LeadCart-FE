import currencies from 'data/currencies';
import numeral from 'numeral';


export const getCurrencySymbol = (code = 'USD') => {
  const currency = currencies.find((c) => c.code === code);

  return currency ? currency.symbol : code;
};

export const getPriceFormat = (price = 0, currency = 'USD', format = 'amount') => {
  const formats = {
    amount: '(0.00)',
    amount_no_decimals: '0',
    amount_with_comma_separator: '(0,0.00)',
    amount_with_comma_separator_no_decimals: '(0,0)'
  };
  const matchedFormat = formats[format] || formats.amount;
  const formatted = numeral(price).format(matchedFormat);
  return `${getCurrencySymbol(currency)} ${formatted}`;
};

export const getPriceWithCurrency = (price, currency, format) => {
  const defaultFormat = `${price}`.includes('.') && !`${price}`.endsWith('.00') ? 'amount_with_comma_separator' : 'amount_with_comma_separator_no_decimals';
  return getPriceFormat(price, currency, format || defaultFormat);
};

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

  const formated = numeral(price).format(matchedFormat);

  // const formatter = new Intl.NumberFormat('en-US', {
  //   style: 'currency',
  //   currency,
  // });
  // return formatter.format(price);

  return `${getCurrencySymbol(currency)} ${formated}`;
};


import React from 'react';
import moment from 'moment';
import { getCurrencySymbol } from 'libs';
import './style.css';

const capitalize = (s) => {
  if (typeof s !== 'string') return '';
  const str = s.toLowerCase();
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const SummarySlice = ({ name, amount = 0, className = '' }) => (
  <div className={`template-summary-slice ${className}`}>
    <span>{name}</span>
    <span>{amount}</span>
  </div>
);


const getPaymentDetails = (name, { type = 'Onetime', recurringPeriod = 'month', splits = 0 } = {}) => {
  const label = name;
  const nextCharge = '';

  switch (type) {
  case 'Onetime': return { label, nextCharge };
  case 'Split':
    return {
      label: `${label}(First Installment Out of ${splits})`,
      nextCharge: moment().add(1, 'M').format('MM/DD/YYYY')
    };
  case 'Subscription': {
    const recTime = recurringPeriod[0].toLowerCase();
    return {
      label: `${label}( Subscription - ${capitalize(recurringPeriod)}ly )`,
      nextCharge: moment().add(1, recTime === 'm' ? 'M' : recTime).format('MM/DD/YYYY')
    };
  }
  default: return { label, nextCharge };
  }
};
const OrderSummary = ({
  payment,
  productName = '',
  price: {
    amount = 0,
    currency = 'USD'
  } = {},
  vat = 0.1,
  language = {},

}) => {
  const {
    orderSummary: orderSummaryLabel,
    total: totalLabel,
    // discount: discountLabel,
  } = language.checkout || {};

  const { label, nextCharge } = getPaymentDetails(productName, payment);

  // const tax = amount * vat
  const total = Number.parseFloat(amount).toFixed(2);
  const currencySymbol = getCurrencySymbol(currency);
  return (
    <section className='product-template-order-summary'>
      <h4>{orderSummaryLabel}</h4>
      <SummarySlice
        name={label}
        amount={`${currencySymbol} ${total}`}
      />
      <SummarySlice
        className='summary-total'
        name={totalLabel}
        amount={`${currencySymbol} ${total}`}
      />
      {nextCharge && (
        <div className='purchases-charge-details'>
          {' '}
          Your next charge is going to be on
          {' '}
          {nextCharge}
        </div>
      )}
    </section>
  );
};

export default OrderSummary;

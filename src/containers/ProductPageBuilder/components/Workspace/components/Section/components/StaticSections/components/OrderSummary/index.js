import React from 'react';
import moment from 'moment';
import {
  // getCurrencySymbol,
  getPriceFormat,
  capitalize
} from 'libs';

import './style.css';


const SummarySlice = ({ name, amount = 0, className = '' }) => (
  <div className={`template-summary-slice ${className}`}>
    <span>{name}</span>
    <span className='no-text-wrap'>{amount}</span>
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
  productName = 'Not Set',
  price: {
    amount = 0,
    currency = 'USD',
    format
  } = {},
  vat = 0.1,
  language = {}

}) => {
  const {
    orderSummary: orderSummaryLabel,
    total: totalLabel
  } = language.checkout || {};

  const { label, nextCharge } = getPaymentDetails(productName, payment);

  const total = getPriceFormat(amount, currency, format);
  return (
    <section className='product-template-order-summary'>
      <h4>{orderSummaryLabel}</h4>
      <SummarySlice
        name={label}
        amount={`${total}`}
      />
      <SummarySlice
        className='summary-total'
        name={totalLabel}
        amount={`${total}`}
      />
      {nextCharge && (
        <div className='purchases-charge-details'>
          Your next charge is going to be on
          {nextCharge}
        </div>
      )}
    </section>
  );
};

export default OrderSummary;

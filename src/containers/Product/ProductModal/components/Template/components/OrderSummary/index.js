import React from 'react';
import moment from 'moment';
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
  payment, productName = '', price: { amount = '' } = {}, vat = 0.1
}) => {
  const { label, nextCharge } = getPaymentDetails(productName, payment);
  // const tax = amount * vat
  const total = Math.round(amount);

  return (
    <section className='product-template-order-summary'>
      <h4>Order Summary</h4>
      <SummarySlice
        name={label}
        amount={amount}
      />
      {/* <SummarySlice
        name={`VAT(${vat * 100}%)`}
        amount={`${tax}$`}
      /> */}
      <SummarySlice
        className='summary-total'
        name='Total'
        amount={`$ ${total}`}
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

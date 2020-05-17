import React from 'react';

import './style.css';

const _data = [
  { name: 'Leadcart premium', value: '$299.00' }
];

const PaymentSummary = ({ data = _data }) => (
  <div className='payment-summary'>
    <div>Order Summary</div>
    <div>
      {
        data.map((paymentItem) => (
          <div className='payment-summary-item d-flex justify-space-between'>
            <div>{paymentItem.name}</div>
            <div>{paymentItem.value}</div>
          </div>
        ))
      }
      <div className='payment-summary-total d-flex justify-space-between'>
        <div>Total</div>
        <div>${data.reduce((total, { value }) => total + parseFloat(value.match(/\d+\.\d+/g)), 0).toFixed(2)}</div></div>
    </div>
  </div>
);

export default PaymentSummary;

import React from 'react';
import moment from 'moment';


import './style.css'
const SummarySlice = ({ name, amount = 0, className = '' }) => (
  <div className={`template-summary-slice ${className}`}>
    <span>{name}</span>
    <span>{amount}</span>
  </div>
)


const getPaymentDetails = (name, { type = 'Onetime', recurringPeriod = '', splits = 0 } = {}) => {
  let label = name;
  let nextCharge = ''

  switch (type) {
    case 'Onetime': return { label, nextCharge }
    case 'Split':
      return {
        label: `${label}(the first charge of ${splits})`,
        nextCharge: moment().add(1, 'M').format('MM/DD/YYYY')
      }
    case 'Subscription':
      const recTime = recurringPeriod[0].toLowerCase() === 'm' ? 'M' : recurringPeriod[0].toLowerCase()
      return {
        label: `${label}(subscription-${recurringPeriod.toLowerCase()})`,
        nextCharge: moment().add(1, recTime).format('MM/DD/YYYY')
      }
    default: return { label, nextCharge }
  }
}
const OrderSummary = ({ payment, productName = '', price: { amount = '' } = {}, vat = .1 }) => {

  const { label, nextCharge } = getPaymentDetails(productName, payment);
  const tax = amount * vat
  const total = tax + amount

  return (
    <section className="product-template-order-summary">
      <h4>Order Summary</h4>
      <SummarySlice
        name={label}
        amount={amount}
      />
      <SummarySlice
        name={`VAT(${vat * 100}%)`}
        amount={`${tax}$`}
      />
      <SummarySlice
        className='summary-total'
        name='Total'
        amount={`${total}$`}
      />
      {nextCharge && <span> your next charge gonna be in {nextCharge}</span>}
    </section>
  );
};

export default OrderSummary;
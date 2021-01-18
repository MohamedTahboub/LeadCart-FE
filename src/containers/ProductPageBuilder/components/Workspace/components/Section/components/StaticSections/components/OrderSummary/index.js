import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

import { useContext } from '../../../../../../../../actions';
import { capitalize, getPriceFormat } from 'libs';

import './style.css';


const SummarySlice = ({ name, amount = 0, className = '' }) => (
  <div className={`template-summary-slice ${className}`}>
    <span>{name}</span>
    <span className='no-text-wrap'>{amount}</span>
  </div>
);


const getPaymentDetails = (
  name,
  { type = 'Onetime', recurringPeriod = 'month', splits = 0 } = {},
  {
    subscriptionMonthly = 'Subscription - Monthly',
    subscriptionYearly = 'Subscription - Yearly',
    splitPayment = 'First Installment Out of '
  } = {},
  dateFormat
) => {
  const isYearlyRecurring = capitalize(recurringPeriod) === 'Year';
  const subscriptionLabel = isYearlyRecurring ? subscriptionYearly : subscriptionMonthly;
  const label = name;
  const nextCharge = '';

  switch (type) {
  case 'Onetime': return { label, nextCharge };
  case 'Split':
    return {
      label: `${label}(${splitPayment + splits})`,
      nextCharge: moment().add(1, 'M').format(dateFormat)
    };
  case 'Subscription': {
    const recTime = recurringPeriod[0].toLowerCase();
    return {
      label: `${label}( ${subscriptionLabel} )`,
      nextCharge: moment().add(1, recTime === 'm' ? 'M' : recTime).format(dateFormat)
    };
  }
  default: return { label, nextCharge };
  }
};


const OrderSummary = ({
  payment,
  productName = 'Not Set',
  defaultBrandCurrency,
  price: {
    amount = 0,
    format
  } = {},
  vat = 0.1,
  language = {},
  dateFormat

}) => {
  const { state: { funnel: { currency = defaultBrandCurrency } = {} } = {} } = useContext();
  const {
    orderSummary: orderSummaryLabel = 'Order Summary',
    total: totalLabel = 'Total',
    nextCharge: nextChargeLabel = 'Your next charge is going to be on '
  } = language.checkout || {};

  const { label, nextCharge } = getPaymentDetails(productName, payment, language.checkout, dateFormat);

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
          {`${nextChargeLabel} ${nextCharge}`}
        </div>
      )}
    </section>
  );
};
const mapStateToProps = ({ settings: { generalModel: { currency: defaultBrandCurrency = 'USD', dateFormat = 'DD/MM/YYYY' } = {} } = {} }) => ({ defaultBrandCurrency, dateFormat });
export default connect(mapStateToProps)(OrderSummary);

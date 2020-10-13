import React from 'react';
import { getCurrencySymbol } from 'libs';
import { RoundTow } from 'libs';
import { ReceiptRow } from './common';
import razorpayLogo  from 'assets/images/brands/razorpay-logo.svg';

import ProductRow from './ProductRow';

const PaymentTypeIcon = ({ type, className = '' }) => {
  const icon = {
    Stripe: <i className={`fas fa-credit-card ${className}`} />,
    COD: <i className={`fas fa-money-bill-alt ${className}`} />,
    Paypal: <i className={`fab fa-cc-paypal ${className}`} />,
    Razorpay: <img src={razorpayLogo} className={`razorpay-order-flag ${className}`} />,
  }[type];

  return icon || null;
};


const Order = ({
  _id: orderId,
  orderNumber,
  onRefund,
  totalCharge,
  defaultCurrency,
  paymentMethod,
  currency = defaultCurrency,
  product = {},
  products = []
}) => {
  if (product.name && !products.length) products.push(product);

  const currencySymbol = getCurrencySymbol(currency);
  return (
    <div className='customer-order-card'>
      <div className='order-code'>{`#LC-${orderNumber}`}</div>
      <PaymentTypeIcon type={paymentMethod} className='order-payment-method-icon'/>
      {
        products.map((product) => (
          <ProductRow
            {...product}
            onRefund={onRefund}
            currency={currency}
            orderId={orderId}
          />))
      }
      <ReceiptRow
        className='receipt-total'
        label='Total'
        value={`${currencySymbol} ${RoundTow(totalCharge)}`}
      />
    </div>
  );
};

export default Order;

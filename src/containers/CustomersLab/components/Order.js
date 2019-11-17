import React, { useState } from 'react';
import common from 'components/common';
import { getCurrencySymbol } from 'libs';
import { RoundTow } from 'libs';
import { ReceiptRow } from './common';
import { OrderOptions } from '.';


import ProductRow from './ProductRow';
const { Button } = common;

const PaymentTypeIcon = ({ type, className = '' }) => {
  const icon = {
    Stripe: <i className={`fas fa-credit-card ${className}`} />,
    COD: <i className={`fas fa-money-bill-alt ${className}`} />,
    Paypal: <i className={`fab fa-cc-paypal ${className}`} />
  }[type];

  return icon || null;
};


const Order = ({
  _id: orderId,
  orderNumber,
  onRefund,
  totalCharge,
  paymentMethod,
  payment = {},
  product = {},
  products = [],
}) => {

  if (product.name && !products.length) products.push(product)

  const [moreOptions, setMoreOptions] = useState(false);
  const currencySymbol = getCurrencySymbol(product.price && product.price.currency);

  return (
    <div className='customer-order-card'>
      <div className='order-code'>{`#LC-${orderNumber}`}</div>
      <PaymentTypeIcon
        type={paymentMethod}
        className='order-payment-method-icon'
      />
      {products.map(product => (
        <ProductRow
          {...product}
          onRefund={onRefund}
          orderId={orderId}
        />)
      )}
      <ReceiptRow
        className='receipt-total'
        label='Total'
        value={`${currencySymbol} ${RoundTow(totalCharge)}`}
      />
    </div>
  );
};
/*
      <OrderOptions
        details={{
          orderId,
          offer,
          payment,
          product,
          currency: currencySymbol
        }}
        show={moreOptions}
        onHide={() => setMoreOptions(false)}
      />
*/
export default Order;

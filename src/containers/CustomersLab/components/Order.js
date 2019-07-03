import React, { useState } from 'react';
import common from 'components/common';
import { getCurrencySymbol } from 'libs';
import { RoundTow } from 'libs';
import { ReceiptRow } from './common';
import { OrderOptions } from '.';
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
  orderCode,
  totalCharge,
  payment = {},
  product: {
    offer = {},
    coupon = {},
    ...product
  } = {}
}) => {
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const currencySymbol = getCurrencySymbol(product.price && product.price.currency);

  return (
    <div className='customer-order-card'>
      <div className='order-code'>{`#${product.name}`}</div>
      <PaymentTypeIcon
        type={payment.paymentMethod}
        className='order-payment-method-icon'
      />
      <ReceiptRow
        label={product.name}
        prefix='Product Name'
        value={product.price && product.price.amount}
      />
      {offer.price && (<ReceiptRow
        className='plus'
        label={offer.name}
        prefix='Offer Included'
        value={offer.price}
      />
      )}
      {coupon.code && (
        <ReceiptRow
          className='minus'
          prefix='Applied coupon code'
          label={coupon.code}
          value={coupon.discount}
        />
      )}

      <ReceiptRow
        className='receipt-total'
        label='total'
        value={`${currencySymbol} ${RoundTow(totalCharge)}`}
      />
      <OrderOptions
        details={{
          orderId,
          offer,
          payment,
          product,
          currency: currencySymbol
        }}
        show={showMoreOptions}
        onHide={() => setShowMoreOptions(false)}
      />
    </div>
  );
};
export default Order;

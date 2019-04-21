import React from 'react';
import { ReceiptRow } from './common';


const Order = ({
  orderCode,
  totalCharge,
  product: {
    offer = {},
    coupon = {},
    ...product
  } = {}
}) => (
  <div className='customer-order-card'>
    <div className='order-code'>{`#${orderCode}`}</div>
    <ReceiptRow
      label={product.name}
      prefix='Product Name'
      value={product.price && product.price.amount}
    />
    { offer.price && (<ReceiptRow
      className='plus'
      label={offer.name}
      prefix='Offer Included'
      value={offer.price}
    />
    )}
    { coupon.code && (
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
      value={`${totalCharge} $`}
    />

  </div>
);

export default Order;

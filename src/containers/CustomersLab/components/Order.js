import React from 'react';
import { ReceiptRow } from './common'



const Order = ({
  orderCode,
  coupon,
  product: { offer, ...product } = {}
}) => {



  let total = product.price
  total += offer ? offer.price : 0
  total -= coupon ? coupon.discount : 0

  return (
    <div className="customer-order-card">
      <div className="order-code">{`#${orderCode}`}</div>
      <ReceiptRow
        label={product.name}
        prefix={'Product Name'}
        value={product.price}
      />
      <ReceiptRow
        className='plus'
        label={offer.name}
        prefix={'Offer Included'}
        value={offer.price}
      />
      <ReceiptRow
        className='minus'
        prefix={'Applied coupon code'}
        label={coupon.code}
        value={coupon.discount}
      />

      <ReceiptRow
        className='receipt-total'
        label='total'
        value={`${total} $`}
      />

    </div>
  );
};

export default Order;
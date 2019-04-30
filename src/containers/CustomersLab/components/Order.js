import React, { useState } from 'react';
import common from 'components/common';
import { ReceiptRow } from './common';

const { Button } = common;

const Order = ({
  orderCode,
  totalCharge,
  product: {
    offer = {},
    coupon = {},
    ...product
  } = {}
}) => {
  const [progress, setProgress] = useState(false);


  const onRefund = () => {
    setProgress(true);
    setTimeout(() => {
      setProgress(false);
    }, 800);
  };
  return (
    <div className='customer-order-card'>
      <div className='order-code'>{`#${product.name}`}</div>
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
        value={`$${totalCharge}`}
      />
      <div className='refund-btn'>
        <Button
          disabled={progress}
          className='primary-color'
          onClick={onRefund}
          onprogress={progress}
        >
          {' '}
      Refund Order ($
          {totalCharge}
        )
        </Button>
      </div>
    </div>
  );
};
export default Order;

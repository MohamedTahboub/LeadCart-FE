import React, { useState } from 'react';
import common from 'components/common';
import { getCurrencySymbol } from 'libs';
import { ReceiptRow } from './common';
import { OrderOptions } from '.';
const { Button } = common;

const Order = ({
  _id: orderId,
  orderCode,
  totalCharge,
  product: {
    offer = {},
    coupon = {},
    ...product
  } = {}
}) => {
  const [progress, setProgress] = useState(false);
  const [showMoreOptions, setShowMoreOptions] = useState(false);

  const currencySymbol = getCurrencySymbol(product.price && product.price.currency);
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
        value={`${currencySymbol} ${totalCharge}`}
      />
      <OrderOptions
        details={{
          orderId, offer, product, currency: currencySymbol
        }}
        show={showMoreOptions}
        onHide={() => setShowMoreOptions(false)}
      />
    </div>
  );
};
export default Order;

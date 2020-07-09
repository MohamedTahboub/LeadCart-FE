import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { getCurrencySymbol } from 'libs';
import { ReceiptRow } from './common';

import ProductActions from './ProductActions';


const getSubRows = ({ offers, coupon }) => {
  const rows = [];
  offers.forEach((offer) => {
    if (offer.name) {
      rows.push({
        ...offer,
        type: 'Offer: ',
        value: offer.price,
        sign: ''
      });
    }
  });
  if (coupon.code) {
    rows.push({
      name: coupon.code,
      type: 'Coupon: ',
      value: coupon.discount,
      sign: '-'
    });
  }

  return rows;
};

const ProductRow = ({
  orderId,
  _id,
  id: productId = _id,
  name,
  price: amount,
  currency,
  offers,
  payment,
  coupon,
  onRefund
}) => {
  const [expand, setExpand] = useState(false);
  const currencySymbol = getCurrencySymbol(currency);
  const subRows = getSubRows({ offers, coupon });
  const haveSubRows = !!subRows.length;

  const onToggleActions = () => {
    setExpand((v) => !v);
  };

  const renderOptions = expand && (
    <ProductActions
      payment={payment}
      onRefund={onRefund}
      offers={offers}
      productName={name}
      orderId={orderId}
      productId={productId}
    />
  );

  let orderStatus = '';
  if (payment.paymentRefunded) orderStatus = ' (REFUNDED)';
  else if (payment.subscriptionCanceled) orderStatus = ' (SUBSCRIPTION CANCELED)';
  else if (payment.subscriptionRefunded) orderStatus = ' (SUBSCRIPTION REFUNDED)';

  return (
    <ReceiptRow
      label={`${name}${orderStatus}`}
      prefix={(
        <span
          className='order-product-action-btn'
          onClick={onToggleActions}
          role='presentation'
        >
          <i className={`fas ${expand ? 'fa-minus-square' : 'fa-plus-square'}`} />
          Product:
        </span>
      )}
      value={`${currencySymbol} ${amount}`}
      subRow={(haveSubRows ? (
        <div className='receipt-sub-row left-sub-branch'>
          {
            subRows.map((row, ix) => (
              <ReceiptRow
                key={ix}
                label={`${row.refunded ? `${row.name} (REFUNDED)` : row.name}`} // offer name or coupon code
                prefix={row.type} // offer or coupon(discount)
                value={`${row.refunded ? '-' : ''} ${row.sign} ${currencySymbol}  ${row.value}`}
              />
            ))
          }
          {renderOptions}
        </div>
      ) : (
        <div className='receipt-sub-row '>{renderOptions}</div>
      )
      )}
    />
  );
};

ProductRow.propTypes = {
  price: PropTypes.number,
  name: PropTypes.string,
  offer: PropTypes.shape({}),
  coupon: PropTypes.shape({})
};
ProductRow.defaultProps = {
  price: {},
  name: 'Untitled Product',
  offer: {},
  coupon: {}
};

export default ProductRow;

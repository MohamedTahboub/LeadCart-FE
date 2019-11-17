import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { getCurrencySymbol } from 'libs';
import { ReceiptRow } from './common';
// import { ActivationSwitchInput } from '../../../components/common/Buttons';

import ProductActions from './ProductActions'




const getSubRows = ({ offer, coupon }) => {
  const rows = [];
  if (offer.name) {
    rows.push({
      name: offer.name,
      type: 'Offer: ',
      value: offer.price,
      sign: ''
    });
  }
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
  price: {
    amount,
    currency
  },
  offer,
  payment,
  coupon,
  onRefund
}) => {
  const [expand, setExpand] = useState(false);
  const currencySymbol = getCurrencySymbol(currency);
  const subRows = getSubRows({ offer, coupon });
  const haveSubRows = !!subRows.length;

  const onToggleActions = () => {
    setExpand((v) => !v);
  };


  const renderOptions = expand && (
    <ProductActions
      payment={payment}
      onRefund={onRefund}
      offer={offer}
      productName={name}
      orderId={orderId}
      productId={productId}
    />
  )

  return (
    <ReceiptRow
      label={name}
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
        <div
          className='receipt-sub-row left-sub-branch'
        >
          {subRows.map((row) => (
            <ReceiptRow
              label={row.name} // offer name or coupon code
              prefix={row.type} // offer or coupon(discount)
              value={`${row.sign} ${currencySymbol}  ${row.value}`}
            />
          ))}
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
  price: PropTypes.objectOf(),
  name: PropTypes.string,
  offer: PropTypes.objectOf(),
  coupon: PropTypes.objectOf(),
};
ProductRow.defaultProps = {
  price: {},
  name: 'Untitled Product',
  offer: {},
  coupon: {},
};

export default ProductRow;

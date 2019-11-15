import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { getCurrencySymbol } from 'libs';
import { ReceiptRow } from './common';


const getSubRows = ({ offer, coupon }) => {
  const rows = [];
  if (offer.name) {
    rows.push({
      name: offer.name,
      type: 'Offer',
      value: offer.price,
      sign: ''
    });
  }
  if (coupon.code) {
    rows.push({
      name: coupon.code,
      type: 'Coupon',
      value: coupon.discount,
      sign: '-'
    });
  }

  return rows;
};

const ProductRow = ({
  name,
  price: {
    amount,
    currency
  },
  offer,
  payment,
  coupon
}) => {
  const [expand, setExpand] = useState(false);
  const currencySymbol = getCurrencySymbol(currency);
  const subRows = getSubRows({ offer, coupon });
  const haveSubRows = !!subRows.length;

  const onToggleActions = () => {
    setExpand((v) => !v);
  };
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
      subRow={(haveSubRows && (
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
          {
            expand && <div>No Actions Available for Now!</div>
          }
        </div>
      )
      )}
    />
  );
};

// <ProductActions payment={payment} />
/*
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
*/
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

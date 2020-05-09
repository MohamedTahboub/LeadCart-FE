import React from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';


const {
  EditableField
} = common;

const OrderButton = ({
  product: {
    price: {
      amount,
      currency
    } = {},
    pagePreferences: {
      themeColor,
      orderButtonText
    } = {}
  } = {},
  onChange,
  ...props
}) => (
  <div className='upsell-order-button'>
    <EditableField
      name='pagePreferences.orderButtonText'
      className='btn upsell-btn'
      value={`${orderButtonText}`}
      autoComplete='off'
      onChange={onChange}
      backgroundColor={themeColor}
    />
  </div>
);
OrderButton.propTypes = {
  value: PropTypes.string
};

OrderButton.defaultProps = {
  value: 'complete the order'
};

export default OrderButton;

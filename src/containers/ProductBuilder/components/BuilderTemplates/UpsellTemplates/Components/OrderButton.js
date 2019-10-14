import React from 'react';
import PropTypes from 'prop-types';

const OrderButton = ({ value, ...props }) => (
  <div className='upsell-order-button'>
    <div className='btn upsell-btn light-green-color'>Get Offer Now - $99</div>
  </div>
);

OrderButton.propTypes = {
  value: PropTypes.string
};

OrderButton.defaultProps = {
  value: 'complete the order'
};

export default OrderButton;

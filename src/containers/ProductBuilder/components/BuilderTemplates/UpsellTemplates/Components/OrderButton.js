import React from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
const {
  List,
  // InputRow,
  // MainTitle,
  // Button,
  // ActivationSwitchInput,
  // SubTabs,
  // FlexBoxesContainer
  EditableField
} = common;
const OrderButton = ({
  product: {
    pagePreferences: {
      orderButtonText
    } = {}
  } = {},
  onChange,
  ...props
}) => (
  <div className='upsell-order-button'>
    <EditableField
      name='pagePreferences.orderButtonText'
      className='btn upsell-btn light-green-color'
      value={orderButtonText}
      onChange={onChange}
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

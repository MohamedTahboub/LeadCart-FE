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
const OrderButton = ({ value, ...props }) => (
  <div className='upsell-order-button'>
    <EditableField className='btn upsell-btn light-green-color'>
      Get Offer Now - $99
    </EditableField>
  </div>
);

OrderButton.propTypes = {
  value: PropTypes.string
};

OrderButton.defaultProps = {
  value: 'complete the order'
};

export default OrderButton;

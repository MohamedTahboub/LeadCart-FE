import React from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import { getCurrencySymbol } from 'libs';


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
}) => {
  const total = Number.parseFloat(amount).toFixed(2);
  const currencySymbol = getCurrencySymbol(currency);


  const style = {
    backgroundColor: themeColor
  };

  const price = `-${currencySymbol}${total}`;

  return (
    <div className='upsell-order-button'>
      <EditableField
        name='pagePreferences.orderButtonText'
        className='btn upsell-btn light-green-color'
        value={`${orderButtonText}`}
        autoComplete='off'
        onChange={onChange}
        style={style}
      />
    </div>
  );
};

OrderButton.propTypes = {
  value: PropTypes.string
};

OrderButton.defaultProps = {
  value: 'complete the order'
};

export default OrderButton;
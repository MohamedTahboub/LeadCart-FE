import React from 'react';
import common from 'components/common';

import './style.css';
const {
  CycleStepTitle,
  CheckoutInput,
  FloatButton
} = common;


export default ({
  data = {},
  color,
  onOptionSelected,
  language = {},
  ...props
}) => {
  const onDisable = () => {
    // props.onChange({
    //   target: {
    //     name: 'shippingDetails.enabled',
    //     value: false
    //   }
    // });
  };

  const {
    shippingDetails,
    streetAddress,
    streetAddress2,
    city,
    state,
    postal,
    country
  } = language.checkout || {};

  return (
    <div className='product-template-billing'>
      <FloatButton
        className='payment-setting-btn'
        onClick={onDisable}
        position={{ left: -27, top: -2 }}
      >
        <i className='fas fa-eye-slash' />
      </FloatButton>
      <CycleStepTitle step='2'>{shippingDetails}</CycleStepTitle>
      <div style={{ color }} className='flex-row'>
        <CheckoutInput
          disabled
          label={streetAddress}
        />
      </div>
      <div style={{ color }} className='flex-row'>
        <CheckoutInput
          disabled
          label={streetAddress2}
        />
      </div>
      <div style={{ color }} className='flex-row'>
        <CheckoutInput
          disabled
          label={city}
        />
        <CheckoutInput
          disabled
          label={state}
        />
      </div>
      <div style={{ color }} className='flex-row'>
        <CheckoutInput
          disabled
          // name='postal'
          label={postal}
        />
        <CheckoutInput
          disabled
          // name='country'
          label={country}
        />
      </div>
    </div>
  );
};

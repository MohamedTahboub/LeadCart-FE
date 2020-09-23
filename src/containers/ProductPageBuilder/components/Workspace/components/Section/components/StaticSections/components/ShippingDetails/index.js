import React from 'react';
import common from 'components/common';

import './style.css';
const { CycleStepTitle, CheckoutInput } = common;


export default ({
  color,
  language = {}
}) => {

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
          label={country}
        />
      </div>
    </div>
  );
};

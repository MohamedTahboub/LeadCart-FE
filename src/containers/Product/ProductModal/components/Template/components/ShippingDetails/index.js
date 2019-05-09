import React from 'react';
import common from 'components/common'

import './style.css'
const { CycleStepTitle, CheckoutInput, FloatButton } = common;


export default ({data ={}, color, onOptionSelected, ...props }) => {

  const onDisable = () => {
    props.onChange({
      target: {
        name: 'shippingDetails.enabled',
        value: false
      }
    })
  }

  if(!data.enabled) return null
  return (
    <div className="product-template-billing">
      <FloatButton
        className='payment-setting-btn'
        onClick={onDisable}
        position={{ left: -27, top: -2 }}
      >
        <i className='fas fa-eye-slash' />
      </FloatButton>
      <CycleStepTitle step='2'>SHIPPING ADDRESS</CycleStepTitle>
      <div style={{ color }} className="flex-row">
        <CheckoutInput
          disabled
          name='address'
          label='Street Address'
        />
      </div>
      <div style={{ color }} className="flex-row">
        <CheckoutInput
          disabled
          name='sec_address'
          label='Street Address Line 2'
        />
      </div>
      <div style={{ color }} className="flex-row">
        <CheckoutInput
          disabled
          name='city'
          label='City'
        />
        <CheckoutInput
          disabled
          name='province'
          label='State / Province'
        />
      </div>
      <div style={{ color }} className="flex-row">
        <CheckoutInput
          disabled
          name='postal'
          label='Postal / Zip Code'
        />
        <CheckoutInput
          disabled
          name='country'
          label='Country'
        />
      </div>
    </div>
  );
};

import React from 'react';
import common from 'components/common';

import './style.css';
const { CycleStepTitle, CheckoutInput } = common;


const BillingDetails = ({ color, ...props }) => (
  <div className='product-template-billing'>

    <CycleStepTitle step='1'>Billing Details</CycleStepTitle>
    <div style={{ color }} className='flex-row'>
      <CheckoutInput
        disabled
        name='firstName'
        label='First Name'
      />
      <CheckoutInput
        disabled
        name='lastName'
        label='Last Name'
      />
    </div>
    <div style={{ color }} className='flex-row'>
      <CheckoutInput
        disabled
        name='email'
        label='Email'
      />
      <CheckoutInput
        disabled
        name='phone'
        label='Phone Number'
      />
    </div>
  </div>
);

export default BillingDetails;

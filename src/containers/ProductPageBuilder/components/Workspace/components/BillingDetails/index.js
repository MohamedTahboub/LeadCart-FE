import React from 'react';
import common from 'components/common';

import './style.css';
const { CycleStepTitle, CheckoutInput } = common;


const BillingDetails = ({ color, language = {}, ...props }) => {
  const {
    billingDetails: title,
    firstName,
    lastName,
    email,
    phoneNumber
  } = language.checkout || {};

  return (
    <div className='product-template-billing'>

      <CycleStepTitle step='1'>{title}</CycleStepTitle>
      <div style={{ color }} className='flex-row'>
        <CheckoutInput
          disabled
          label={firstName}
        />
        <CheckoutInput
          disabled
          label={lastName}
        />
      </div>
      <div style={{ color }} className='flex-row'>
        <CheckoutInput
          disabled
          label={email}
        />
        <CheckoutInput
          disabled
          label={phoneNumber}
        />
      </div>
    </div>
  );
};

export default BillingDetails;

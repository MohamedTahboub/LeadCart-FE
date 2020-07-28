import React from 'react';
import common from 'components/common';
import { useContext } from '../../../../../../../../actions';

import './style.css';
const { CycleStepTitle, CheckoutInput } = common;


const BillingDetails = ({ color, language = {}, twoStepCheckout }) => {
  const {
    billingDetails: title,
    firstName,
    lastName,
    email,
    phoneNumber
  } = language.checkout || {};
  const { state: { product: { custom: { shippingDetails } } } } = useContext();


  return (
    <div className='product-template-billing'>
      {
        shippingDetails || !twoStepCheckout ?
          <CycleStepTitle step='1'>{title}</CycleStepTitle> :
          <div className='black-title'>{title}</div>
      }
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

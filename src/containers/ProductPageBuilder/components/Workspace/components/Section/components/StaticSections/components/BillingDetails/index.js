import React from 'react';
import common from 'components/common';
import { useContext } from '../../../../../../../../actions';

import './style.css';
import { PhoneNumberInput } from 'components/common/Inputs';
const { CycleStepTitle, CheckoutInput } = common;


const BillingDetails = ({ color, language = {}, twoStepCheckout }) => {
  const {
    billingDetails: title,
    firstName,
    lastName,
    email,
    phoneNumber,
    addressLine1Label = 'Address',
    addressLine1Placeholder = 'E.g Street, PO Box, or company name',
    postalCodeLabel = 'Zip Code/Postcode'
  } = language.checkout || {};
  const { state: { product: { custom: { shippingDetails, billingAddress: withBillingAddress } = {} } } } = useContext();


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
        <PhoneNumberInput
          disabled
          label={phoneNumber}
        />
      </div>
      {withBillingAddress && (
        <div style={{ color }} className='flex-row'>
          <CheckoutInput
            disabled
            label={addressLine1Label}
            placeholder={addressLine1Placeholder}
          />
          <CheckoutInput
            disabled
            label={postalCodeLabel}
          />
        </div>
      )}
    </div>
  );
};

export default BillingDetails;

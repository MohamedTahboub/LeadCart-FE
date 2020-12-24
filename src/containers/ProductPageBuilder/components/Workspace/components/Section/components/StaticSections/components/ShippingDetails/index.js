import React from 'react';
import common from 'components/common';

import './style.css';
const { CycleStepTitle, CheckoutInput } = common;

const FlexRow = ({ color, children }) => (
  <div style={{ color }} className='flex-row'>
    {children}
  </div>
);

export default ({
  color,
  language = {}
}) => {

  const {
    shippingDetails,
    streetAddress,
    secondStreetAddress,
    city,
    state,
    postal,
    country
  } = language.checkout || {};

  return (
    <div className='product-template-billing'>

      <CycleStepTitle step='2'>{shippingDetails}</CycleStepTitle>
      <FlexRow color={color}>
        <CheckoutInput disabled label={streetAddress} />
      </FlexRow>
      <FlexRow color={color}>
        <CheckoutInput disabled label={secondStreetAddress} />
      </FlexRow>
      <FlexRow color={color}>
        <CheckoutInput disabled label={city} />
        <CheckoutInput disabled label={state} />
      </FlexRow>
      <FlexRow color={color}>
        <CheckoutInput disabled label={postal} />
        <CheckoutInput disabled label={country} />
      </FlexRow>
    </div>
  );
};

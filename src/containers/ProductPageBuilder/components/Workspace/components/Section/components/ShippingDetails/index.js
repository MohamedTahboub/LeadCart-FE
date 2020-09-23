import React from 'react';
import common from 'components/common';

import './style.css';
const {
  CycleStepTitle,
  CheckoutInput
} = common;


export default ({
  section = {},
  language = {}
}) => {
  const { styles = {} } = section;
  const { themeColor } = styles;
  const {
    shippingDetails,
    streetAddress,
    streetAddress2,
    city,
    state,
    postal,
    country
  } = language.checkout || {};

  const style = {
    ...styles,
    marginTop: `${styles.marginTop}px`,
    marginBottom: `${styles.marginBottom}px`,
    marginLeft: `${styles.marginLeft}px`,
    marginRight: `${styles.marginRight}px`,
    paddingTop: `${styles.paddingTop}px`,
    paddingBottom: `${styles.paddingBottom}px`,
    paddingLeft: `${styles.paddingLeft}px`,
    paddingRight: `${styles.paddingRight}px`
  };

  return (
    <div className='product-template-billing' style={style}>
      <CycleStepTitle step='2'>{shippingDetails}</CycleStepTitle>
      <div style={{ color: themeColor }} className='flex-row'>
        <CheckoutInput
          disabled
          label={streetAddress}
        />
      </div>
      <div style={{ color: themeColor }} className='flex-row'>
        <CheckoutInput
          disabled
          label={streetAddress2}
        />
      </div>
      <div style={{ color: themeColor }} className='flex-row'>
        <CheckoutInput
          disabled
          label={city}
        />
        <CheckoutInput
          disabled
          label={state}
        />
      </div>
      <div style={{ color: themeColor }} className='flex-row'>
        <CheckoutInput
          disabled
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

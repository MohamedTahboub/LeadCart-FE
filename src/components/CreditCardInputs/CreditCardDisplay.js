import React from 'react';
import classNames from 'classnames';
import CreditCardInput from 'react-credit-card-input';

import './style.css';

const CreditCardDisplay = ({ value }) => (
  <CreditCardInput
    containerClassName='unwanted-pregnancy'
    cardNumberInputRenderer={({ props }) => (
      <input
        {...props}
        value={value.substring(0, 14).replace(/\d/g, '*').concat(value.substring(14)).insertAt('4n', ' ')}
        autoComplete='cc-number'
        disabled
        className={classNames(props.className, 'transparent-bg')}
      />
    )}
    cardExpiryInputRenderer={() => null}
    cardCVCInputRenderer={() => null}
  />
);

export default CreditCardDisplay;

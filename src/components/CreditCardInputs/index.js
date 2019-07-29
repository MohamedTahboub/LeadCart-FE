import React, { Fragment, useState } from 'react';
import CreditCardInput from 'react-credit-card-input';

import './style.css';

export default ({
  className = '',
  onChange = () => {}
}) => {
  const onCreditFieldChange = (name, value) => {
    onChange({
      target: { name, value }
    });
  };

  return (
    <div
      id='credit-card-box'
      className={className}
    >
      <CreditCardInput
        cardNumberInputRenderer={({ handleCardNumberChange, props }) => (
          <input
            {...props}
            autoComplete='cc-number'
            onChange={handleCardNumberChange((e) => onCreditFieldChange('credit.cardNumber', e.target.value))}
          />
        )}
        cardExpiryInputRenderer={({ handleCardExpiryChange, props }) => (
          <input
            {...props}
            autoComplete='cc-exp-month-year'
            onChange={handleCardExpiryChange((e) => onCreditFieldChange('credit.expiryDate', e.target.value))}
          />
        )}
        cardCVCInputRenderer={({ handleCardCVCChange, props }) => (
          <input
            {...props}
            autoComplete='cc-csc'
            onChange={handleCardCVCChange((e) => onCreditFieldChange('credit.cvc', e.target.value))}
          />
        )}
      />
    </div>
  );
};

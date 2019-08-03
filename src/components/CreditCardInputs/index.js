import React, { Fragment, useState } from 'react';
import CreditCardInput from 'react-credit-card-input';

import './style.css';

export default ({
  className = '',
  onChange
}) => {
  const [credit, setCredit] = useState({});


  const onCreditFieldChange = (name, value) => {
    let fields;
    if (name === 'expireDate' && value) {
      const [expiryMonth, expiryYear] = value.split(' / ');
      fields = {
        ...credit,
        expiryMonth,
        expiryYear
      };
    }else {
      fields = {
        ...credit,
        [name]: value
      };
    }
    setCredit(fields);
    onChange({
      target: {
        name: 'credit',
        value: fields
      }
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
            onChange={handleCardNumberChange((e) => onCreditFieldChange('cardNumber', e.target.value))}
          />
        )}
        cardExpiryInputRenderer={({ handleCardExpiryChange, props }) => (
          <input
            {...props}
            autoComplete='cc-exp-month-year'
            onChange={handleCardExpiryChange((e) => onCreditFieldChange('expireDate', e.target.value))}
          />
        )}
        cardCVCInputRenderer={({ handleCardCVCChange, props }) => (
          <input
            {...props}
            autoComplete='cc-csc'
            onChange={handleCardCVCChange((e) => onCreditFieldChange('cvc', e.target.value))}
          />
        )}
      />
    </div>
  );
};

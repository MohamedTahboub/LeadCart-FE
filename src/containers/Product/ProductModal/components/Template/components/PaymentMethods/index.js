import React from 'react';
import common from 'components/common'
import creditsImage from 'assets/images/payment-cards.png'
import paypalImage from 'assets/images/paypal-thumbnail.png'

import './style.css'

const { CycleStepTitle, RadioImageCard, FloatButton } = common

const PaymentMethods = ({ onOptionSelected }) => {
  return (
    <div className='template-payment-methods-container'>
      <FloatButton
        onClick={() => onOptionSelected('PaymentOptions')}
        position={{ left: -25 }}
      >
        <i className="fas fa-cog" />
      </FloatButton>
      <CycleStepTitle
        step='2'
        className='underlined template-payment-method-title'
      >
        PAYMENT METHOD
      </CycleStepTitle>
      <RadioImageCard
        title='Credit Cards'
        name='payment-type'
        image={creditsImage}
      />
      <RadioImageCard
        title='Credit Cards'
        name='payment-type'
        image={paypalImage}
      />
    </div>
  );
};

export default PaymentMethods;

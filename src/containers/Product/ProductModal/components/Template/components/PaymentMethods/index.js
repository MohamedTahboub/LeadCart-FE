import React, { Fragment, useState } from 'react';
import common from 'components/common'
import creditsImage from 'assets/images/payment-cards.png'
import paypalImage from 'assets/images/paypal-thumbnail.png'
import creditCardImage from 'assets/images/credit-card-demo.gif'

import './style.css'


const { CycleStepTitle, RadioImageCard, FloatButton } = common

const PaymentSelectionDemo = ({ method }) => {
  let src;
  let classes = ''
  if (method === 1) {
    src = creditCardImage
    classes = 'credit-card'
  }
  else
    src = paypalImage

  return (
    <img
      src={src}
      alt="paypal Image"
      className={`template-payment-gateway-demo ${classes}`} />
  )
}
const PaymentMethods = ({ onOptionSelected }) => {
  const [method, setMethod] = useState(1);


  return (
    <Fragment>
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
          onClick={() => setMethod(1)}
        />
        <RadioImageCard
          title='Credit Cards'
          name='payment-type'
          image={paypalImage}
          onClick={() => setMethod(2)}
        />
      </div>
      <PaymentSelectionDemo method={method} />
    </Fragment>
  );
};

export default PaymentMethods;

import React, { Fragment, useState } from 'react';
import common from 'components/common';
import creditsImage from 'assets/images/payment-cards.png';
import paypalImage from 'assets/images/paypal-thumbnail.png';
import creditCardImage from 'assets/images/credit-card-demo.gif';
import payOnDeliveryImage from 'assets/images/payOnDelivery.jpg';
import cashOnDeliveryImage from 'assets/images/cod.png';

import './style.css';


const { CycleStepTitle, RadioImageCard, FloatButton } = common;

const PaymentSelectionDemo = ({ method }) => {
  let src;
  let classes = '';
  if (method === 1) {
    src = creditCardImage;
    classes = 'credit-card';
  } else if (method === 2) {
    src = paypalImage;
  } else if (method === 3) {
    src = payOnDeliveryImage;
    classes = 'cod-image';
  } else {
    return null;
  }

  return (
    <img
      src={src}
      alt='paypal Image'
      className={`template-payment-gateway-demo ${classes}`}
    />
  );
};
const PaymentMethods = ({ onOptionSelected, methods = [], step = 2 }) => {
  const [method, setMethod] = useState(0);


  return (
    <Fragment>
      <div className='template-payment-methods-container'>
        <CycleStepTitle
          step={step}
          className='underlined template-payment-method-title'
        >
          Payment Methods
        </CycleStepTitle>
        {methods.includes('Stripe') && (
          <RadioImageCard
            title='Credit Cards'
            name='payment-type'
            image={creditsImage}
            onClick={() => setMethod(1)}
          />
        )}
        {methods.includes('Paypal') && (
          <RadioImageCard
            title='Credit Cards'
            name='payment-type'
            image={paypalImage}
            onClick={() => setMethod(2)}
          />
        )}
        {methods.includes('COD') && (
          <RadioImageCard
            title='Cash On Delivery'
            name='payment-type'
            image={cashOnDeliveryImage}
            onClick={() => setMethod(3)}
          />
        )}
      </div>
      <PaymentSelectionDemo method={method} />
    </Fragment>
  );
};

export default PaymentMethods;
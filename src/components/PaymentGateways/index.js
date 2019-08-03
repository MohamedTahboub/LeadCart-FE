import React, { useState, Fragment } from 'react';
// import common from 'components/common';
// import * as productActions from 'actions/product';
import paypalImage from 'assets/images/paypal.png';
import stripeImage from 'assets/images/stripe.png';
import cashOnDeliveryImage from 'assets/images/cod.png';
import { openNewWindow } from 'libs';
import common from 'components/common';
import { connect } from 'react-redux';

import './style.css';

const {
  MediumCard, InputRow
} = common;


function Message ({ children }) {
  return (
    <div className='message-note'>
      <span className='message-content'>{children}</span>
    </div>
  );
}


const PaymentMethods = ({
  payment: { methods = [] } = {},
  userPaymentsMethods = [],
  ...props
}) => {
  const [error, setError] = useState('');

  const isMethodExist = (method) => userPaymentsMethods.find(({ name }) => name === method);

  const onChange = (method) => {
    if (!methods.includes(method) && methods.length >= 2) return setError('each product accepts two payment methods as max');

    if (isMethodExist(method) || method === 'COD') {
      props.onChange({
        target: {
          name: 'payment.methods',
          value: methods.includes(method)
            ? methods.filter((m) => m !== method)
            : [...methods, method]
        }
      });
      setError('');
    }
  };

  return (
    <Fragment>
      <div className='payment-methods-cards-container'>
        {isMethodExist('Stripe')
          && (
            <MediumCard
              className='template-payment-card'
              imgSrc={stripeImage}
              isActive={methods.includes('Stripe')}
              onClick={() => onChange('Stripe')}
            />
          )}
        {isMethodExist('Paypal')
          && (
            <MediumCard
              className='template-payment-card'
              imgSrc={paypalImage}
              isActive={methods.includes('Paypal')}
              onClick={() => onChange('Paypal')}
            />
          )
        }
        <MediumCard
          className='template-payment-card'
          imgSrc={cashOnDeliveryImage}
          isActive={methods.includes('COD')}
          onClick={() => onChange('COD')}
        />
      </div>
      {error && <div className='adding-payment-error'>{error}</div>}
      <br />
      <InputRow>
        {userPaymentsMethods.length
          ? (
            <Message>
              you can add or remove the payment gateways from:
              <span onClick={() => openNewWindow('/settings/integrations')}>
                {' '}
                settings/integrations
              </span>
            </Message>
          )
          : (
            <Message>
              You Don't Have Any Payment Method connected to Your Account,Add from
              <span onClick={() => openNewWindow('/settings/integrations')}>
                {' '}
                settings/integrations
              </span>
            </Message>
          )}
      </InputRow>
    </Fragment>
  );
};

const mpaStateToProps = ({
  payments: {
    methods: userPaymentsMethods = {}
  } = {}
}) => ({
  userPaymentsMethods
});

export default connect(mpaStateToProps)(PaymentMethods);


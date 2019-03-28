import React, { Fragment } from 'react';
import PaymentType from 'components/PaymentType';
import { connect } from 'react-redux';

// import common from 'components/common';
// import * as productActions from 'actions/product';
import { Link } from 'components/common/MainMenu';
import paypalImage from 'assets/images/paypal.png';
import stripeImage from 'assets/images/stripe.png';
import { openNewWindow } from 'libs'
import common from 'components/common';

import './style.css'

const {
  Title, MediumCard, InputRow
} = common;

let PaymentMethods = ({
  methods = [], onProductPaymentFieldChange, userPayments, history, ...props
}) => {
  const onChange = (method) => {
    if (userPayments.includes(method)) {
      onProductPaymentFieldChange({
        name: 'methods',
        value: methods.includes(method)
          ? methods.filter((m) => m !== method)
          : [...methods, method]
      });
    }
  };

  return (
    <Fragment>
      {userPayments.includes('Stripe')
        && (
          <MediumCard
            className='template-payment-card'
            imgSrc={stripeImage}
            isActive={methods.includes('Stripe')}
            onClick={() => onChange('Stripe')}
          />
        )}
      {userPayments.includes('Paypal')
        && (
          <MediumCard
            className='template-payment-card'
            imgSrc={paypalImage}
            isActive={methods.includes('Paypal')}
            onClick={() => onChange('Paypal')}
          />
        )
      }
      <InputRow>
        {userPayments.length
          ? (
            <Message>
              you can add or remove the payment gateways from: 
              <span onClick={() => openNewWindow('/settings/integrations')}>
              {' '}settings/integrations
              </span>
            </Message>
          )
          : (
            <Message>
              You Dont Have Any Payment Method connected to Your Account,Add from
            <span onClick={() => openNewWindow('/settings/integrations')}>
                {' '}settings/integrations
          </span>
            </Message>
          )}
      </InputRow>
    </Fragment>
  );
};


function Message({ children }) {
  return (
    <div className='product-payment-message'>
      <span className='message-content'>{children}</span>
    </div>
  );
}

const mpaStateToProps = ({
  product: { payment },
  payments: userPayments
}) => ({ userPayments: userPayments.methods, productPaymentMethods: payment.methods || [] });
PaymentMethods = connect(mpaStateToProps)(PaymentMethods);



const PaymentOptions = ({ price, payment, ...props }) => {

  const onChange = ({ price, payment }) => {
    if (payment.type === 'Subscription') {
      payment.recurringPeriod = {
        Monthly: 'MONTH',
        Yearly: 'YEAR'
      }[payment.recurringPeriod || 'Monthly'];
    }

    props.onChange({ target: { name: 'price', value: { amount: +(price) } } });
    props.onChange({ target: { name: 'payment', value: payment } });
  };

  return (
    <div className="template-payment-options">
      <Title>Payment Type</Title>
      <PaymentType
        payment={payment}
        onChange={onChange}
        price={price}
      />
      <Title>Payment Gateways</Title>
      <PaymentMethods />
    </div>
  )
}

export default PaymentOptions;
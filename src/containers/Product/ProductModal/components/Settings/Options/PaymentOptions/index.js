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
  payment: { methods = [] } = {}, userPaymentsMethods, ...props
}) => {
  const onChange = (method) => {
    if (userPaymentsMethods.includes(method)) {
      props.onChange({
        target: {
          name: 'payment.methods',
          value: methods.includes(method)
            ? methods.filter((m) => m !== method)
            : [...methods, method]
        }
      });
    }
  };

  return (
    <Fragment>
      {userPaymentsMethods.includes('Stripe')
        && (
          <MediumCard
            className='template-payment-card'
            imgSrc={stripeImage}
            isActive={methods.includes('Stripe')}
            onClick={() => onChange('Stripe')}
          />
        )}
      {userPaymentsMethods.includes('Paypal')
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
        {userPaymentsMethods.length
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
  payments: userPayments
}) => ({ userPaymentsMethods: userPayments.methods });
PaymentMethods = connect(mpaStateToProps)(PaymentMethods);



const PaymentOptions = ({ product: { price, payment } = {}, ...props }) => {


  return (
    <div className="template-payment-options">
      <Title>Payment Type:</Title>
      <PaymentType
        payment={payment}
        onChange={props.onChange}
        price={price}
      />
      <Title>Payment Gateways:</Title>
      <PaymentMethods {...props} payment={payment} />
    </div>
  )
}

export default PaymentOptions;
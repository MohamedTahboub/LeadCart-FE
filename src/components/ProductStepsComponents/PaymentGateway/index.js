import React from 'react';
import common from 'components/common';
import { connect } from 'react-redux';
import * as productActions from 'actions/product';
import { Link } from 'components/common/MainMenu';
import paypalImage from 'assets/images/paypal.png';
import stripeImage from 'assets/images/stripe.png';

const {
  MainTitle, MediumCard, InputRow
} = common;

const Payment = ({
  productPaymentMethods, userPayments, history, ...props
}) => (
  <React.Fragment>
    <MainTitle>Payment Method</MainTitle>
    {userPayments.includes('Stripe')
        && (
          <MediumCard
            imgSrc={stripeImage}
            isActive={productPaymentMethods.includes('Stripe')}
            onClick={() => props.addProductPaymentMethod('Stripe')}
          />
        )}
    {userPayments.includes('Paypal')
        && (
          <MediumCard
            imgSrc={paypalImage}
            isActive={productPaymentMethods.includes('Stripe')}
            onClick={() => props.addProductPaymentMethod('Paypal')}
          />
        )
    }
    <InputRow>
      {userPayments.length
        ? (
          <Message>
              You Can always add new Payment methods from the
            <Link to={{ history, page: '/settings/integrations' }}> settings/integrations</Link>
          </Message>
        )
        : (
          <Message>
              You Dont Have Any Payment Method connected to Your Account,Add from
            <Link to={{ history, page: '/settings/integrations' }}> settings/integrations</Link>

          </Message>
        )}
    </InputRow>
  </React.Fragment>
);


function Message ({ children }) {
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
export default connect(mpaStateToProps, productActions)(Payment);

import React from 'react';
import common from 'components/common';
import { connect } from 'react-redux';
import * as productActions from 'actions/product';

import paypalImage from 'assets/images/paypal.png';
import stripeImage from 'assets/images/stripe.png';

const { MainTitle, MediumCard } = common;

const Payment = ({ payment = {}, props }) => (
  <React.Fragment>
    <MainTitle>Payment Method</MainTitle>
    <MediumCard
      imgSrc={stripeImage}
      isActive={true || payment.methods && payment.methods.includes('Stripe')}
      onClick={() => props.toggleProductPayment('Stripe')}
    />
    <MediumCard
      imgSrc={paypalImage}
      isActive={payment.methods && payment.methods.includes('Paypal')}
      onClick={() => props.toggleProductPayment('Stripe')}
    />
  </React.Fragment>
);
const mpaStateToProps = ({ product: { payment } }) => ({ payment });
export default connect(mpaStateToProps, productActions)(Payment);

import React from 'react';
import common from 'components/common';

import paypalImage from 'assets/images/paypal.png';
import stripeImage from 'assets/images/stripe.png';

const { MainTitle, MediumCard } = common;

export default (props) => (
  <React.Fragment>
    <MainTitle>Payment Method</MainTitle>
    <MediumCard imgSrc={stripeImage} />
    <MediumCard imgSrc={paypalImage} />
  </React.Fragment>
);

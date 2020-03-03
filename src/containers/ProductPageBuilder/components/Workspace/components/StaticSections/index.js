import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  BillingDetails,
  CompleteOrderBtn,
  OrderSummary,
  PaymentMethods,
} from '../../components';

const StaticSections = ({ language }) => (
  <Fragment>
    <BillingDetails
      // color={color}
      language={language}
    />
    <PaymentMethods
      step={2}
      // onOptionSelected={onOptionSelected}
      methods={['Paypal', 'Stripe']}
      // onShowSetting
      // onFieldChange
      language={language}
    />
    <OrderSummary
      price={32}
      productName='Growth hacking'
      // payment={product.payment}
      language={language}
    />
    <CompleteOrderBtn
      // text={product.pagePreferences && product.pagePreferences.orderButtonText}
      // color={color}
      // onChange={onChange}
      language={language}
    />
  </Fragment>
);

StaticSections.propTypes = {

};

export default StaticSections;

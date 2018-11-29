import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as producActions from 'actions/product';
import common from 'components/common';
import PaymentType from 'components/PaymentType';

const { InputRow } = common;


const ProductPrice = ({
  errors, productDetails: {
    name, payment, price, url, description
  }, subdomain, ...props
}) => {
  const onFieldChange = ({ target: { name, value } }) => {
    props.onProductDetailsFieldChange({ name, value });
  };


  const onPaymentChange = (payment) => {
    const { price: amount, ...paymentMethod } = payment;
    const casted = { type: paymentMethod.type };

    if (paymentMethod.type === 'Split') casted.splits = +(paymentMethod.splits) || 2;
    if (paymentMethod.type === 'Subscription') casted.recurringPeriod = paymentMethod.recurringPeriod || 'Monthly';

    props.onProductDetailsFieldChange({ name: 'price', value: { amount: +(amount) } });
    props.onProductDetailsFieldChange({ name: 'payment', value: casted });
  };

  return (
    <Fragment>
      <PaymentType type='' onChange={onPaymentChange} value={payment || {}} price={price ? price.amount : 0} />
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  subdomain: state.user.user.subDomain,
  productDetails: state.product.details,
  errors: state.product.details.errors,
});

export default connect(mapStateToProps, producActions)(ProductPrice);

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as producActions from 'actions/product';
import common from 'components/common';
import PaymentType from 'components/PaymentType';

// const { InputRow } = common;


const ProductPrice = ({
  errors, payment, price, onMandatoryDetailsFieldChange
}) => {
  const onPaymentChange = (payment) => {
    const { price: amount, ...paymentMethod } = payment;
    const casted = { type: paymentMethod.type };

    if (paymentMethod.type === 'Split') casted.splits = +(paymentMethod.splits) || 2;
    if (paymentMethod.type === 'Subscription') casted.recurringPeriod = paymentMethod.recurringPeriod || 'Monthly';

    onMandatoryDetailsFieldChange({ name: 'price', value: { amount: +(amount) } });
    onMandatoryDetailsFieldChange({ name: 'payment', value: casted });
  };

  return (
    <Fragment>
      <PaymentType type='' onChange={onPaymentChange} value={payment || {}} price={price ? price.amount : 0} />
    </Fragment>
  );
};
const mapStateToProps = ({ product: { mandatoryDetails } }) => ({ ...mandatoryDetails });
export default connect(mapStateToProps, producActions)(ProductPrice);

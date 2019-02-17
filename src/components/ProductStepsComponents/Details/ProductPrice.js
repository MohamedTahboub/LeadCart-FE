import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as producActions from 'actions/product';
import common from 'components/common';
import PaymentType from 'components/PaymentType';

// const { InputRow } = common;


const ProductPrice = ({
  errors, payment, price: { amount: price = 0 } = {}, onMandatoryDetailsFieldChange
}) => {
  const onChange = ({ price, payment }) => {
    onMandatoryDetailsFieldChange({ name: 'price', value: { amount: +(price) } });
    onMandatoryDetailsFieldChange({ name: 'payment', value: payment });
  };
  return (
    <Fragment>
      <PaymentType
        payment={payment}
        onChange={onChange}
        price={price}
      />
    </Fragment>
  );
};
const mapStateToProps = ({ product: { mandatoryDetails } }) => ({ ...mandatoryDetails });
export default connect(mapStateToProps, producActions)(ProductPrice);

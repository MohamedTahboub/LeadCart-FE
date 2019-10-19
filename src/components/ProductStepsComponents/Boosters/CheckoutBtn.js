import React, { Component, Fragment } from 'react';
import common from 'components/common';

import { connect } from 'react-redux';
import * as producActions from 'actions/product';

const { InputRow } = common;


class CheckoutBtn extends Component {
  onFieldChange = ({ target: { name, value } }) => {
    this.props.onProductBoostersFieldChange({ name, value });
  }

  render () {
    const { orderButtonText } = this.props;
    return (
      <InputRow>
        <InputRow.Label>Checkout Button Text</InputRow.Label>
        <InputRow.SmallInput name='orderButtonText' value={orderButtonText} onChange={this.onFieldChange}></InputRow.SmallInput>
      </InputRow>
    );
  }
}


const mapStateToProps = ({
  product: {
    boosters: { orderButtonText }
  }
}) => ({
  orderButtonText
});
export default connect(mapStateToProps, producActions)(CheckoutBtn);

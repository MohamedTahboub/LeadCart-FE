import React, { Component, Fragment } from 'react';
import common from 'components/common';

import { connect } from 'react-redux';
import * as producActions from 'actions/product';

const { InputRow } = common;


class Guarantee extends Component {
  state = {
    testimonials: {
      text: '',
      value: '',
      value: []
    }
  }

  onFieldChange = ({ target: { name, value } }) => {
    this.props.onProductCheckoutFieldChange({ name, value });
  }

  render () {
    const { guaranteeTitle, guaranteeText } = this.props.checkout;
    return (
      <Fragment>
        <InputRow>
          <InputRow.Label>Guarantee Title</InputRow.Label>
          <InputRow.NormalInput name='guaranteeTitle' value={guaranteeTitle} onChange={this.onFieldChange}></InputRow.NormalInput>
        </InputRow>
        <InputRow>
          <InputRow.Label>Guarantee Text</InputRow.Label>
          <InputRow.NormalInput name='guaranteeText' value={guaranteeText} onChange={this.onFieldChange}></InputRow.NormalInput>
        </InputRow>
      </Fragment>
    );
  }
}


const mapStateToProps = ({ product: { checkout } }) => ({ checkout });
export default connect(mapStateToProps, producActions)(Guarantee);

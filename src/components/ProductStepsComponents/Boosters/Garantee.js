import React, { Component, Fragment } from 'react';
import common from 'components/common';

import { connect } from 'react-redux';
import * as producActions from 'actions/product';
import guaranteeImage from 'assets/images/guarantee.png';

import './style.css'
const { InputRow } = common;;
class Guarantee extends Component {
  state = {
    guarantee: !!this.props.product.guarantee
  }


  onGuaranteeEnabled = () => {
    const guarantee = !this.state.guarantee;
    this.setState({ guarantee });

    this.props.onProductCheckoutFieldChange({
      name: 'guarantee',
      value: guarantee
    });
  }

  render () {
    const { guarantee } = this.props.product;
    return (
      <Fragment>
        <InputRow margin='45'>
          <InputRow.Label
            notes="This badge will be shown on the footer(or How it's described in the Checkouts Designs) of the checkout page."
          >
            Show Guarantee Badge

          </InputRow.Label>
          <InputRow.SwitchInput name='guarantee' onToggle={this.onGuaranteeEnabled} value={guarantee}></InputRow.SwitchInput>
        </InputRow>
        {this.state.guarantee && (
          <img className='guarantee-badge-image' src={guaranteeImage} alt='guarantee badge' />
        )}
      </Fragment>
    );
  }
}


const mapStateToProps = ({ product }) => ({ product });
export default connect(mapStateToProps, producActions)(Guarantee);

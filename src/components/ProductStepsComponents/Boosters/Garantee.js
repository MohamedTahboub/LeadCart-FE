import React, { Component, Fragment } from 'react';
import common from 'components/common';

import { connect } from 'react-redux';
import * as producActions from 'actions/product';
import guaranteeImage from 'assets/images/guarantee.png';

import './style.css';
const { InputRow } = common;
class Guarantee extends Component {
  state = {
    showGuaranteeBadge: Boolean(this.props.showGuaranteeBadge)
  }


  onGuaranteeEnabled = () => {
    const showGuaranteeBadge = !this.state.showGuaranteeBadge;
    this.setState({ showGuaranteeBadge });

    this.props.onProductBoostersFieldChange({
      name: 'showGuaranteeBadge',
      value: showGuaranteeBadge
    });
  }

  render () {
    const { showGuaranteeBadge } = this.state;
    return (
      <Fragment>
        <InputRow margin='45'>
          <InputRow.Label
            notes="This badge will be shown on the footer(or How it's described in the Checkouts Designs) of the checkout page."
          >
            Show Guarantee Badge

          </InputRow.Label>
          <InputRow.SwitchInput name='guarantee' onToggle={this.onGuaranteeEnabled} value={showGuaranteeBadge}></InputRow.SwitchInput>
        </InputRow>
        {showGuaranteeBadge && (
          <img className='guarantee-badge-image' src={guaranteeImage} alt='guarantee badge' />
        )}
      </Fragment>
    );
  }
}


const mapStateToProps = ({ product: { boosters } }) => ({ ...boosters });
export default connect(mapStateToProps, producActions)(Guarantee);

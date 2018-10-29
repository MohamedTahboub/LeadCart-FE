import React, { Component } from 'react';

import { connect } from 'react-redux'
import * as promoCodeActions from 'actions/promocode'

import './styles.css';

class PromoCodeActivation extends Component {
  render() {
    return (
      <div className='wrapper'>
        <div className='promo-container'>
          <span className='promo-title'>
            Promo Code
          </span>
          <p className='promo-description'>The code will be aplied to the account </p>
          <input className='promo-input' type='password' />
        </div>
        <div className='form-container'>
          <button onClick={() => this.props.activatePromoCode()} type='submit' className='form-submit signup-btn'>sign up</button>
        </div>
        <footer>
          © LeadCart. All rights reserved 2018
        </footer>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  validationError: state.validation.credit
})

export default connect(mapStateToProps, promoCodeActions)(PromoCodeActivation);

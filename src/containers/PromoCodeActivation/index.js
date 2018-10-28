import React, { Component } from 'react';
import amex from 'assets/companyPaymentLogos/amex.svg';
import discover from 'assets/companyPaymentLogos/discover.svg';
import mc from 'assets/companyPaymentLogos/mc.svg';
import visa from 'assets/companyPaymentLogos/visa.svg';

import { connect } from 'react-redux'
import * as signupActions from 'actions/signup'

import './styles.css';

class PromoCodeActivation extends Component {
  render () {
    return (
      <div className='wrapper'>
        <div className='promo-container'>
          <span className='promo-title'>
          Promo Code
          </span>
          <p className='promo-description'>The code will be aplied to the account </p>
          <input className='promo-input' type='password' />
        </div>
        <div className='logo-header'>
          <span className='login-header-title'>sign up</span>
          <div className='logo-description'>
                Payment Information
          </div>
          <div className='payment-logs'>
            <img alt='visa' src={visa} />
            <img alt='mc' src={mc} />
            <img alt='discover' src={discover} />
            <img alt='amex' src={amex} />

          </div>
        </div>
        <div className='form-container'>
          <div
            className='form-input credit-card'
          >
            <input />

          </div>
          <div className='form-row'>
            <div className='form-input date'><input /></div>
            <div className='form-input cvv'><input /></div>
          </div>
          <button onClick={()=>this.props.activatePromoCode()} type='submit' className='form-submit signup-btn'>sign up</button>
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

export default connect(mapStateToProps, signupActions)(PromoCodeActivation);

import React, { Component } from 'react';
import logo from 'assets/logo.svg';
import amex from 'assets/companyPaymentLogos/amex.svg';
import discover from 'assets/companyPaymentLogos/discover.svg';
import mc from 'assets/companyPaymentLogos/mc.svg';
import visa from 'assets/companyPaymentLogos/visa.svg';
import './styles.css';

class CreditCardForm extends Component {
  render () {
    return (
      <div className='wrapper'>
        <div className='logo-container'>
          <div className='logo'>
            <img alt='' src={logo} />
          </div>
          <div className='logo-header'>
            <h1>sign up</h1>
          </div>
          <div className='logo-description'>
          Payment Information
          </div>
          <div className='payment-logs'>
            <div>
              <img alt='' src={visa} />

            </div>
            <div>
              <img alt='' src={mc} />

            </div>
            <div>
              <img alt='' src={discover} />

            </div>
            <div>
              <img alt='' src={amex} />

            </div>
          </div>
        </div>
        <div className='form-container'>
          <div
            className='form-input credit-card' style={{ width: '100%' }}
          >
            <input />

          </div>
          <div className='form-row'>
            <div className='form-input date'><input /></div>
            <div className='form-input cvv'><input /></div>
          </div>
          <button type='submit' className='form-submit'>sign up</button>
        </div>
        <footer>
        © LeadCart. All rights reserved 2018
        </footer>
      </div>
    );
  }
}

export default CreditCardForm;

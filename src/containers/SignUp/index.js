import React, { Component } from 'react';
import { FormLogo } from 'components/common/logos';
import './styles.css';

class SignUp extends Component {
  render () {
    return (
      <div className='wrapper'>
        <FormLogo />
        <div className='logo-header'>
          <span className='login-header-title'>sign up</span>
          <div className='logo-description'>
          Contact Information
          </div>
        </div>
        <div className='form-container'>
          <div className='form-input name'><input /></div>
          <div className='form-input email'><input /></div>
          <div className='form-input company'><input /></div>
          <div className='w subdomain'>
            <input className='leadcart-user' />
            <span>.leadcart.io</span>
          </div>
          <button type='submit' className='form-submit'>next</button>
        </div>
        <footer>
        © LeadCart. All rights reserved 2018
        </footer>
      </div>
    );
  }
}

export default SignUp;

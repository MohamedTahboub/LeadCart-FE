import React, { Component } from 'react';
// eslint-disable-next-line
import { FormLogo } from 'components/common/logos';
import './styles.css';

class ForgetPassword extends Component {
  render () {
    return (
      <div className='wrapper'>
        <FormLogo />
        <div className='logo-header'>
          <span className='login-header-title'>recovery password</span>
        </div>
        <div className='logo-description'>
            If you forget or lost your password,receive recovery link on email
        </div>
        <div className='form-container'>
          <div className='form-input email'><input /></div>
          <button type='submit' className='form-submit'>send</button>

        </div>
        <footer>
          © LeadCart. All rights reserved 2018
        </footer>
      </div>
    );
  }
}

export default ForgetPassword;

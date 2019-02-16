import React, { Component } from 'react';
// eslint-disable-next-line
import { FormLogo } from 'components/common/logos';
import './styles.css';

class ForgetPassword extends Component {
  recoverAccount = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
  };

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
        <form onSubmit={this.recoverAccount} className='form-container'>
          <div className='form-input'><input name='email' placeholder='Your Email address' /></div>
          <button type='submit' className='form-submit'>send</button>

        </form>
        <div className='account-refrance-links'>
          <a className='singup-page-link' href='/login'>Try to login</a>
        </div>
        <footer>
          © LeadCart. All rights reserved 2018
        </footer>
      </div>
    );
  }
}

export default ForgetPassword;

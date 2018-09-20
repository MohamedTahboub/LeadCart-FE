import React, { Component } from 'react';
// eslint-disable-next-line
import logo from 'assets/logo.svg';
import './styles.css';

class ForgetPassword extends Component {
  render () {
    return (
      <div className='wrapper'>
        <div className='logo-container'>
          <div className='logo'>
            <img alt='' src={logo} />
          </div>
          <div className='logo-header'>
            <h1>recovery password</h1>
          </div>
          <div className='logo-description'>
            If you forget or lost your password,receive recovery link on email
          </div>
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

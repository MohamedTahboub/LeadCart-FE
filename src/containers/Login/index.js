import React, { Component } from 'react';
// eslint-disable-next-line
import logo from 'assets/images/logo.svg';
import './styles.css';

class Login extends Component {
  render () {
    return (
      <div className='wrapper'>
        <div className='logo-container'>
          <div className='logo'>
            <img alt='' src={logo} />
          </div>
          <div className='logo-header'>
            <h1>sign in</h1>
          </div>
          <div className='logo-description'>
            Hello there! Sign in and start managing your products
          </div>
        </div>
        <div className='form-container'>
          <div className='form-input email'><input /></div>
          <div className='form-input password'><input /></div>
          <button type='submit' className='form-submit'>sign in now</button>
          <div className='form-forget-password'>
            <span>forget password?</span>
            <span> Reset</span>
          </div>
        </div>
        <footer>
          © LeadCart. All rights reserved 2018
        </footer>
      </div>
    );
  }
}

export default Login;

import React, { Component } from 'react';
import logo from 'assets/logo.svg';
import './styles.css';

class SignUpPage extends Component {
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
          Contact Information
          </div>
        </div>
        <div className='form-container'>
          <div className='form-input name'><input /></div>
          <div className='form-input email'><input /></div>
          <div className='form-input company'><input /></div>
          <div className='form-input subdomain'><input /></div>
          <button type='submit' className='form-submit'>next</button>
        </div>
        <footer>
        © LeadCart. All rights reserved 2018
        </footer>
      </div>
    );
  }
}

export default SignUpPage;


import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormLogo } from 'components/common/logos';
import * as loginActions from 'actions/login';
import './styles.css';

const Login = ({
  isLoggedIn, history, login, errors
}) => {
  isLoggedIn && history.push('/');
  const onLogin = (e) => {
    e.preventDefault();
    const {
      target: { email: { value: email }, password: { value: password } }
    } = e;
    console.log(email, password);
    login({ email, password });
  };


  return (
    <div className='wrapper'>
      <FormLogo />
      <div className='logo-header'>
        <span className='login-header-title'>sign in</span>
        <div className='logo-description'>
          Hello there! Sign in and start managing your products
        </div>
      </div>
      <form onSubmit={onLogin} className='form-container'>
        <div className='form-input'>
          <input type='email' name='email' placeholder='Email' />
          {errors.email && <span className='input-feild-error'>{errors.email}</span>}
        </div>
        <div className='form-input'>
          <input type='password' name='password' placeholder='Password' />
          {errors.password && <span className='input-feild-error'>{errors.password}</span>}
        </div>

        {errors.loginError && <span className='login-error-field'>{errors.loginError}</span>}
        <button type='submit' className='form-submit'>sign in now</button>
        <div className='account-refrance-links'>
          <a className='forgetpwd-link' href='/forgetpwd'> forget password?</a>
        </div>
      </form>
      <footer>
        © LeadCart. All rights reserved 2018
      </footer>
    </div>
  );
};


const mapStateToProps = ({
  user: {
    isLoggedIn,
    error: loginError
  },
  validation: { login: errors }
}) => ({
  isLoggedIn,
  errors: { loginError, ...errors }
});
export default connect(mapStateToProps, loginActions)(Login);


import React, { Component } from 'react';
import { connect } from 'react-redux'
import { FormLogo } from 'components/common/logos';
import * as loginActions from 'actions/login'
import './styles.css';

const Login = ({ login, errors }) => {

  const onLogin = e => {
    const {
      target: { email, password }
    } = e

    login({ email, password })
  }


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
        <div className='form-input email'>
          <input type='email' name='email' />
          {errors.email && <span className="input-feild-error">{errors.email}</span>}
        </div>
        <div className='form-input password'>
          <input type='password' name='password' />
          {errors.password && <span className="input-feild-error">{errors.password}</span>}
        </div>
        <button type='submit' className='form-submit'>sign in now</button>
        <div className='form-forget-password'>
          <span>forget password?</span>
          <span> Reset</span>
        </div>
      </form>
      <footer>
        © LeadCart. All rights reserved 2018
        </footer>
    </div>
  );
}


const mapStateToProps = ({ user: { isLoggedIn }, validation: { login: errors } }) => ({ isLoggedIn, errors })
export default connect(mapStateToProps, loginActions)(Login);

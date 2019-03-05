
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormLogo } from 'components/common/logos';
import * as loginActions from 'actions/login';
import './styles.css';


const CustomInputField = ({
  type = 'text', error, name, placeholder, label = 'Label', className = ''
}) => (
  <div className={`custom-input-field ${className}`}>
    {error && <span className='input-feild-error'>{error}</span>}
    <input
      type={type}
      name={name}
      id={name}
      placeholder={placeholder}
    />
    <label htmlFor={name}>{label}</label>
  </div>
);
const Login = ({
  isLoggedIn, history, login, errors
}) => {
  isLoggedIn && history.push('/');
  const onLogin = (e) => {
    e.preventDefault();
    const {
      target: { email: { value: email }, password: { value: password } }
    } = e;
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
        <CustomInputField
          name='email'
          label='Email address'
          placeholder='Enter your email adderss'
          error={errors.email}
        />
        <CustomInputField
          name='password'
          label='Password'
          type='password'
          placeholder='Enter your password'
          error={errors.password}
        />
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

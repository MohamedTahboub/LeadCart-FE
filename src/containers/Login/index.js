
import React from 'react';
import { connect } from 'react-redux';
// import { FormLogo } from 'components/common/logos';
import * as loginActions from 'actions/login';
import CustomInputField from 'components/CustomInputField';
import './styles.css';

import whiteBrandLogo from 'assets/images/leadcart-white-brand.png';

import common from 'components/common';
const {
  FormLogo,
  Feature,
  FlexBox,
  Button,
  InputRow
} = common;


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
    <FlexBox className='full-page background-image-elements' center column>
      <FlexBox className='header-logo-container' wrappable>
        <FlexBox className='min-width-300' flex center>
          <img src={whiteBrandLogo} alt='leadcart brand' className='lc-white-logo' />
        </FlexBox>
        <FlexBox flex className='min-width-300' />
        <FlexBox flex className='min-width-300' />
      </FlexBox>
      <FlexBox spaceBetween className='form-container' wrappable>
        <FormLogo />
        <div className='logo-header'>
          <span className='login-header-title'>sign in</span>
          <div className='logo-description'>
            Hello there! Sign in and start managing your products
          </div>
        </div>
        <form onSubmit={onLogin} className='login-form'>
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
          <Button
            type='submit'
            className='primary-color large-text access-btn arrow-icon'
            // disabled={processing}
            // onProgress={processing}
          >
            Sign in
          </Button>
          <div className='account-refrance-links'>
            <a className='forgetpwd-link' href='/password/forget'>Forgot your password?</a>
            <a className='forgetpwd-link' href='/signup'>Don't Have An Account Yey?</a>
          </div>
        </form>
      </FlexBox>
      <footer className='copyright-text'>
        © LeadCart. All rights reserved 2019
      </footer>
    </FlexBox>
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

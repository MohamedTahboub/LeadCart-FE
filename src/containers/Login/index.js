
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as loginActions from 'actions/login';
import './styles.css';

import whiteBrandLogo from 'assets/images/leadcart-white-brand.png';

import common from 'components/common';
const {
  FlexBox,
  Button,
  InputGroup
} = common;

const Login = ({ isLoggedIn, history, login, errors }) => {

  useEffect(() => {
    isLoggedIn && history.push('/');
  }, [history, isLoggedIn]);

  const onLogin = (e) => {
    const { email, password } = e.target.elements;
    e.preventDefault();
    login({ email: email.value, password: password.value });
  };


  return (
    <FlexBox className='full-page background-image-elements' center='h-center v-center' column>
      <FlexBox className='header-logo-container' wrappable>
        <FlexBox className='min-width-300' flex center>
          <img src={whiteBrandLogo} alt='leadcart brand' className='lc-white-logo' />
        </FlexBox>
        <FlexBox flex className='min-width-300' />
        <FlexBox flex className='min-width-300' />
      </FlexBox>
      <FlexBox flex center='v-center'>
        <FlexBox spaceBetween className='form-container padding-bottom-40' wrappable>
          <FlexBox flex spaceBetween className='full-width margin-bottom-30' center>
            <span className='login-header-title'>Sign in</span>
            <a className='gray-text bold-text not-underlined underlined-text small-text animate' href='/password/forgot'>Forgot Password?</a>
          </FlexBox>

          <form onSubmit={onLogin} className='login-form' data-testid='login-form'>
            <InputGroup
              name='email'
              label='Email address'
              error={errors.email}
              autoComplete='off'
              data-testid='email'
            />
            <InputGroup
              name='password'
              label='Password'
              type='password'
              autoComplete='off'
              data-testid='password'
              error={errors.password}
            />
            {errors.loginError && <span className='error-text' data-testid='error-message' >{errors.loginError}</span>}
            <Button
              type='submit'
              className='primary-color large-text access-btn arrow-icon'
              data-testid='submit'
            >
              Sign in
            </Button>
          </form>
        </FlexBox>
      </FlexBox>
      <footer className='copyright-text'>
        © LeadCart. All rights reserved 2020
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


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
  InputRow,
  InputGroup
} = common;

// const { InputGroup } = InputRow;

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
      <FlexBox spaceBetween className='form-container padding-bottom-40' wrappable>
        <FlexBox flex spaceBetween className='full-width margin-bottom-30' center>
          <span className='login-header-title'>Sign in</span>
          <a className='gray-text bold-text not-underlined underlined-text small-text animate' href='/password/forget'>Forgot Password?</a>
        </FlexBox>

        <form onSubmit={onLogin} className='login-form'>
          <InputGroup
            name='email'
            label='Email address'
            error={errors.email}
            autocomplete="off"
          />
          <InputGroup
            name='password'
            label='Password'
            type='password'
            autocomplete="off"
            error={errors.password}
          />
          {errors.loginError && <span className='error-text'>{errors.loginError}</span>}
          <Button
            type='submit'
            className='primary-color large-text access-btn arrow-icon'
          >
            Sign in
          </Button>
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

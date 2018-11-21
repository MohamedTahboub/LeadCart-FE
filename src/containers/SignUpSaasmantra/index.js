import React, { Component } from 'react';
import { FormLogo } from 'components/common/logos';
import { connect } from 'react-redux';
import * as signupActions from 'actions/signup';

import './styles.css';

class SignUp extends Component {
  componentDidUpdate = () => this.props.isLoggedIn && this.props.history.push('/')

  onSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      email: e.target.email.value,
      companyName: e.target.company.value,
      code: e.target.code.value,
      password: e.target.password.value,
      subDomain: e.target.subdomain.value
    };
    this.props.signUp(newUser);
  }

  render () {
    const { validationError: errors, signupError } = this.props;
    return (
      <div className='wrapper'>
        <div className='logo-header'>
          <FormLogo />
          <span className='login-header-title'>sign up</span>
        </div>
        <form className='form-container' onSubmit={this.onSubmit}>
          <div className='form-input'>
            <input name='firstName' placeholder='First Name' />
            {errors.firstName && <span className='input-feild-error'>{errors.firstName}</span>}
          </div>
          <div className='form-input'>
            <input name='lastName' placeholder='Last Name' />
            {errors.lastName && <span className='input-feild-error'>{errors.lastName}</span>}
          </div>
          <div className='form-input '>
            <input name='email' placeholder='Email' />
            {errors.email && <span className='input-feild-error'>{errors.email}</span>}
          </div>
          <div className='form-input '>
            <input name='password' type='password' placeholder='Password' />
            {errors.password && <span className='input-feild-error'>{errors.password}</span>}
          </div>
          <div className='form-input '>
            <input name='company' placeholder='Company Name' />
            {errors.company && <span className='input-feild-error'>{errors.company}</span>}
          </div>
          <div className='w subdomain'>
            <input className='leadcart-user' name='subdomain' />
            <span className='main-domain-suffix'>.leadcart.io</span>
            {errors.subdomain && <span className='input-feild-error'>{errors.subdomain}</span>}
          </div>
          <div className='promo-container'>
            <span className='promo-title'>
              Promo Code
            </span>
            <p className='promo-description'>The code will be aplied to the account </p>
            <p className='promo-description'>Please make sure You enter your PRO code, You will be able to enter your AGENCY codes inside the application dashboard</p>
            <input className='promo-input' name='code' placeholder='PROMO CODE' />
            {errors.code && <span className='input-feild-error'>{errors.code}</span>}
          </div>
          {signupError && <span className='signup-error-field'>{signupError}</span>}
          <button type='submit' className='form-submit'>Sign Up</button>
        </form>
        <footer>
          © LeadCart. All rights reserved 2018
        </footer>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  isLoggedIn: state.user.isLoggedIn,
  user: state.user,
  signupError: state.user.error,
  validationError: state.validation.signup
});


export default connect(mapStateToProps, signupActions)(SignUp);

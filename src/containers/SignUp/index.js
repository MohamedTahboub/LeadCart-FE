import React, { Component } from 'react';
import { FormLogo } from 'components/common/logos';
import { connect } from 'react-redux';
import * as signupActions from 'actions/signup';

import './styles.css';

class SignUp extends Component {
  state = { success: false, error: '' }

  componentDidUpdate = () => this.props.isLoggedIn && this.props.history.push('/')

  onSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      firstName: e.target.username.value.split(' ')[0],
      lastName: e.target.username.value.split(' ')[1],
      email: e.target.email.value,
      companyName: e.target.company.value,
      password: e.target.password.value,
      subDomain: e.target.subdomain.value
    };
    this.props.signUp(
      newUser, {
        onSuccess: () => {
          this.setState({ success: true });
        },
        onFailed: (err) => {
          console.log('errrrror ', err);
          this.setState({ error: err });
        }
      }
    );
  }

  render () {
    const { success, error, errors = {} } = this.state;

    if (success) {
      return (
        <div className='account-verify-page'>
          <div className='verified-message-container'>
            <i className='fas fa-check-circle' />
            <span className='verified-label'>
              You Have signed up successfully,
              <br />
              please check your inbox to verify your account .
            </span>
          </div>
        </div>
      );
    }
    return (
      <div className='wrapper'>
        <FormLogo />
        <div className='logo-header'>
          <span className='login-header-title'>sign up</span>
          <div className='logo-description'>
            Contact Information
          </div>
        </div>
        <form className='form-container' onSubmit={this.onSubmit}>
          <div className='form-input name'>
            <input name='username' />
            {errors.username && <span className='input-feild-error'>{errors.username}</span>}
          </div>
          <div className='form-input email'>
            <input name='email' />
            {errors.email && <span className='input-feild-error'>{errors.email}</span>}
          </div>
          <div className='form-input password'>
            <input name='password' type='password' />
            {errors.password && <span className='input-feild-error'>{errors.password}</span>}
          </div>
          <div className='form-input company'>
            <input name='company' />
            {errors.company && <span className='input-feild-error'>{errors.company}</span>}
          </div>
          <div className='w subdomain'>
            <input className='leadcart-user' name='subdomain' />
            <span className='main-domain-suffix'>.leadcart.io</span>
            {errors.subdomain && <span className='input-feild-error'>{errors.subdomain}</span>}
          </div>
          {error && <span className='signup-error-field'>{error}</span>}
          <button type='submit' className='form-submit'>next</button>
        </form>
        <footer>
          © LeadCart. All rights reserved 2018
        </footer>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  singupSuccess: state.user.singupSuccess
});


export default connect(mapStateToProps, signupActions)(SignUp);

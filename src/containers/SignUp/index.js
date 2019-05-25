import React, { Component } from 'react';
import { FormLogo } from 'components/common/logos';
import { connect } from 'react-redux';
import * as signupActions from 'actions/signup';
import CustomInputField from 'components/CustomInputField';
import { freeTrailSignup } from 'libs/validation';
import './styles.css';

class SignUp extends Component {
  state = { success: false, processing: false, errors: {} }

  componentDidUpdate = () => this.props.isLoggedIn && this.props.history.push('/')

  onSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = {
        firstName: e.target.firstName.value,
        lastName: e.target.lastName.value,
        email: e.target.email.value,
        companyName: e.target.company.value,
        password: e.target.password.value,
        subDomain: e.target.subdomain.value
      };

      const { isValid, value, errors } = await freeTrailSignup(newUser);

      if (!isValid) return this.setState({ errors });
      this.setState({ processing: true });
      this.props.signUp(
        value,
        {
          trial: true,
          onSuccess: (m) => {
            this.setState({ success: true, processing: false });
          },
          onFailed: (error) => {
            this.setState({ success: false, errors: { message: error }, processing: false });
          }
        }
      );
    } catch ({ message = '' }) {
      // if (message.includes('Cannot read property')) message = 'Please check your fields and try again';
      this.setState({ success: false, errors: { message }, processing: false });
    }
  }

  onChange = ({ target: { name } }) => {
    this.setState({
      errors: { ...this.state.errors, [name]: '', message: '' }
    });
  }

  render () {
    // const { validationError: errors, signupError } = this.props;
    const { success, errors = {}, processing } = this.state;

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
        <div className='logo-header'>
          <FormLogo />
          <span className='login-header-title'>sign up</span>
          <span className='login-header-message'>
            free trial for 7 days on
            {' '}
            <a href='https://leadcart.io' target='_blank'>
              leadcart
            </a>
          </span>
        </div>
        <form className='form-container' onSubmit={this.onSubmit}>
          <CustomInputField
            name='firstName'
            label='First Name'
            placeholder='your first name'
            onChange={this.onChange}
            error={errors.firstName}
          />
          <CustomInputField
            name='lastName'
            label='Last Name'
            placeholder='your last name'
            onChange={this.onChange}
            error={errors.lastName}
          />
          <CustomInputField
            name='email'
            label='Email address'
            placeholder='Enter your email address'
            onChange={this.onChange}
            error={errors.email}
          />
          <CustomInputField
            name='password'
            label='Password'
            type='password'
            placeholder='Set a strong password'
            onChange={this.onChange}
            error={errors.password}
          />
          <CustomInputField
            name='company'
            label='Company Name'
            placeholder='Set the Company Name'
            onChange={this.onChange}
            error={errors.company}
          />
          <div className='w subdomain'>
            <input className='leadcart-user' name='subdomain' />
            <span className='main-domain-suffix'>.leadcart.io</span>
            {errors.subdomain && <span className='input-feild-error'>{errors.subdomain}</span>}
          </div>
          {errors.message && <span className='signup-error-field'>{errors.message}</span>}
          <button type='submit' disabled={processing} className={`form-submit ${processing ? 'spinner' : ''}`}> Sign Up</button>
        </form>
        <footer>
          © LeadCart. All rights reserved 2019
        </footer>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  isLoggedIn: state.user.isLoggedIn
});


export default connect(mapStateToProps, signupActions)(SignUp);

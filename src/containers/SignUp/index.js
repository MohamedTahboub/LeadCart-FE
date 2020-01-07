import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as signupActions from 'actions/signup';
import CustomInputField from 'components/CustomInputField';
import { freeTrailSignup } from 'libs/validation';
import whiteBrandLogo from 'assets/images/leadcart-white-brand.png';

import config from 'config';
import common from 'components/common';

import './styles.css';

// import { FormLogo } from 'components/common/logos';
// import { Feature } from 'components/common/Custom';
// import { FlexBox } from 'components/common/boxes';
import { VerificationPage } from './components';


const { packagesPlans } = config;
const {
  FormLogo,
  Feature,
  FlexBox,
  Button,
  InputRow
} = common;

const { TextField } = InputRow;

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
            const message = typeof error !== 'string' ? error.message : error;

            this.setState({ success: false, errors: { message }, processing: false });
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

    if (success) return <VerificationPage />;


    return (
      <div className='full-page background-image-elements'>
        <FlexBox className='header-logo-container' wrappable>
          <FlexBox className='min-width-300' flex center>
            <img src={whiteBrandLogo} alt='leadcart brand' className='lc-white-logo' />
          </FlexBox>
          <FlexBox flex className='min-width-300' />
          <FlexBox flex className='min-width-300' />
        </FlexBox>
        <FlexBox spaceBetween className='form-content' flex wrappable>

          <FlexBox column className='white-text margin-top-50' flex>
            <div className='larger-text uppercase-text'>
              Start your free Trial
            </div>
            <div className='margin-v-20'>
              Simple, Yet Powerful Cart Solution To Help You Convert More Sales
              <br />
              & Maximize Profits.
            </div>
            <FlexBox column>
              {packagesPlans.pro.features.map((feature) => <Feature>{feature}</Feature>)}
            </FlexBox>
          </FlexBox>

          <form className='form-container' onSubmit={this.onSubmit}>
            <div className='pages-demo-hate' />
            <div className='logo-header'>
              <FormLogo />
              <span className='login-header-title'>sign up</span>
              <span className='login-header-message'>
                free trial for 7 days on
                <a href='https://leadcart.io' target='_blank' rel='noopener noreferrer'>
                  leadcart
                </a>
              </span>
            </div>
            <FlexBox column center>
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
            </FlexBox>
            <TextField
              name='subdomain'
              className='subdomain-field'
              placeholder='e.g. companyname'
              suffix={<span className='main-domain-suffix'>.leadcart.io</span>}
              error={errors.subdomain}
            />
            {errors.message && <span className='signup-error-field'>{errors.message}</span>}
            <Button
              type='submit'
              className='primary-color large-text arrow-icon'
              disabled={processing}
              onProgress={processing}
            >
              Sign Up
            </Button>
          </form>
        </FlexBox>

        <footer className='copyright-text'>
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

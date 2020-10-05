import React, { useState } from 'react';
import { connect } from 'react-redux';

import * as signupActions from 'actions/signup';
import { freeTrailSignup } from 'libs/validation';
import whiteBrandLogo from 'assets/images/leadcart-white-brand.png';
import config from 'config';
import common from 'components/common';
import { VerificationPage } from './components';
import { removeSpacesFromObj } from 'helpers/common';

import './styles.css';

const { packagesPlans } = config;
const {
  Feature,
  FlexBox,
  Button,
  InputGroup
} = common;


const SignUp = (props) => {
  props.isLoggedIn && props.history.push('/');

  const [success, setSuccess] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState({});

  const onSubmit = async (e) => {
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

      const { isValid, value, errors } = await freeTrailSignup(removeSpacesFromObj(newUser));

      !isValid ? setErrors({ ...errors }) :
        props.signUp(
          value,
          {
            trial: true,
            onSuccess: () => {
              setSuccess(true);
              setProcessing(false);
            },

            onFailed: (error) => {
              const message = typeof error !== 'string' ? error.message : error;
              setSuccess(false);
              setProcessing(false);
              setErrors({ message });
            }
          }
        );

    } catch ({ message = '' }) {
      setSuccess(false);
      setProcessing(false);
      setErrors({ message });
    }
  };


  const onChange = ({ target: { name } }) => {
    setErrors({ ...errors, [name]: '', message: '' });
  };


  return success ? <VerificationPage /> :
    (
      <FlexBox column className='full-page signup-page background-image-elements'>

        <FlexBox className='header-logo-container' wrappable>
          <FlexBox className='min-width-300' flex center='v-center'>
            <img src={whiteBrandLogo} alt='leadcart brand' className='lc-white-logo' />
          </FlexBox>
          <FlexBox flex className='min-width-300' />
          <FlexBox flex className='min-width-300' />
        </FlexBox>

        <FlexBox spaceBetween className='form-content' flex wrappable
          center='v-center'
        >

          <FlexBox column className='white-text margin-top-50' flex>
            <div className='larger-text uppercase-text'>
              Start your free Trial
            </div>

            <div className='margin-v-20'>
              Simple, Yet Powerful Cart Solution To Help You Convert More Sales
              <br />
              &amp; Maximize Profits.
            </div>

            <FlexBox column>
              {packagesPlans.pro.features.map((feature, index) => <Feature key={index}>{feature}</Feature>)}
            </FlexBox>
          </FlexBox>

          <div className='margin-top-20px-on-900'>
            <form className='form-container' onSubmit={onSubmit}>

              <FlexBox flex spaceBetween className='full-width margin-bottom-30' center='v-center'>
                <span className='login-header-title'>Sign up</span>
                <a className='gray-text bold-text not-underlined underlined-text small-text animate' href='https://leadcart.io/pricing'>
                  Check Our Plans
                </a>
              </FlexBox>

              <FlexBox column center='v-center'>
                <FlexBox className='full-width' center='v-center'>
                  <InputGroup
                    name='firstName'
                    label='First Name'
                    onChange={onChange}
                    error={errors.firstName}
                    className='margin-right-20'
                  />

                  <InputGroup
                    name='lastName'
                    label='Last Name'
                    onChange={onChange}
                    error={errors.lastName}
                  />
                </FlexBox>

                <InputGroup
                  name='email'
                  label='Email address'
                  onChange={onChange}
                  error={errors.email}
                />

                <InputGroup
                  name='password'
                  label='Password'
                  type='password'
                  onChange={onChange}
                  error={errors.password}
                />

                <InputGroup
                  name='company'
                  label='Company Name'
                  onChange={onChange}
                  error={errors.company}
                />

              </FlexBox>
              <InputGroup
                name='subdomain'
                label='Sub-Domain'
                className='subdomain-field'
                placeholder='e.g. companyname'
                suffix={<span className='main-domain-suffix'>.leadcart.io</span>}
                error={errors.subdomain}
              />

              {errors.message && <span className='error-text'>{errors.message}</span>}

              <Button
                type='submit'
                className='primary-color large-text arrow-icon'
                disabled={processing}
                onProgress={() => {
                  return processing;
                }}
              >
                Sign Up
              </Button>
            </form>
          </div>

        </FlexBox>
        <footer className='copyright-text'>
          &copy; LeadCart. All rights reserved 2020
        </footer>
      </FlexBox>
    );
};

const mapStateToProps = (state) => ({ isLoggedIn: state.user.isLoggedIn });
export default connect(mapStateToProps, signupActions)(SignUp);

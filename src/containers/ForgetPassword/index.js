import React, { Fragment, useState } from 'react';
import CustomInputField from 'components/CustomInputField';
import { connect } from 'react-redux';
import * as accountActions from 'actions/account';
import { FormLogo } from 'components/common/logos';
import * as yup from 'yup';

import './styles.css';

const ForgetPassword = (props) => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [processing, setProcessing] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const isValid = await (yup.string().email().required()).isValid(email);

    if (!isValid) return setError('Please macke sure you enter a valida email address');

    setProcessing(true);
    props.forgotPassword(
      { email },
      {
        onSuccess: () => {
          setProcessing(false);
          setSuccess(true);
        },
        onFailed: (message) => {
          setProcessing(false);
          setSuccess(false);
          setError(message);
        }
      }
    );
  };

  const onChange = () => {
    setError('');
  };

  return (
    <div className='wrapper'>
      <FormLogo />
      <div className='logo-header'>
        <span className='login-header-title'>recovery password</span>
      </div>

      {!success ? (
        <Fragment>
          <div className='logo-description'>
            If you forget or lost your password,receive recovery link on email
          </div>
          <form onSubmit={onSubmit} className='form-container'>
            <CustomInputField
              name='email'
              label='Email'
              // type='email'
              placeholder='Email Address'
              error={error}
              onChange={onChange}
            />
            <button disabled={processing} type='submit' className='form-submit'>send</button>

          </form>
        </Fragment>
      )
        : (
          <div className='logo-description'>
            Please check your inbox and follow the instructions, to reset your password
          </div>
        )}
      <div className='account-refrance-links'>
        <a className='singup-page-link' href='/login'>Try to login</a>
      </div>
      <footer>
        © LeadCart. All rights reserved 2018
      </footer>
    </div>
  );
};

export default connect(null, accountActions)(ForgetPassword);

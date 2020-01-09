import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as accountActions from 'actions/account';
// import { FormLogo } from 'components/common/logos';
// import CustomInputField from 'components/CustomInputField';
import whiteBrandLogo from 'assets/images/leadcart-white-brand.png';
import './style.css';
import { FaSpinner } from 'react-icons/fa';

import common from 'components/common';
const {
  FormLogo,
  Feature,
  FlexBox,
  Button,
  InputRow,
  InputGroup
} = common;


const PasswordRest = ({ isLoggedIn, history, ...props }) => {
  const { hash } = props.match.params || {};


  const [processing, setProcessing] = useState(false);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  useEffect(() => {
    if (isLoggedIn) history.push('/');
    if (!hash) history.push('/login');

    if (!verified && !error) {
      setProcessing(true);
      props.verifyResetKey(
        {
          hash
        },
        {
          onSuccess: () => {
            setVerified(true);
            setProcessing(false);
          },
          onFailed: (message) => {
            setProcessing(false);
            setError(message);
            history.push('/login');
          }
        }
      );
    }
  });


  const onReset = (e) => {
    e.preventDefault();

    const {
      target: {
        newPassword: { value: newPassword },
        newPasswordConfirmation: { value: newPasswordConfirmation }
      }
    } = e;

    setProcessing(true);
    if (verified) {
      props.resetPassword({
        newPassword,
        newPasswordConfirmation,
        hash
      }, {
        onSuccess: () => {
          setProcessing(false);
          setSuccess(true);
          setTimeout(() => {
            history.push('/login');
          }, 3000);
        },
        onFailed: (message) => {
          setProcessing(false);
          // history.push('/login');
          setError(message);
        }
      });
    }
  };

  //   if (isLoggedIn) return null;
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
            <span className='login-header-title'>
              Create New Password
            </span>
            <a className='gray-text bold-text not-underlined underlined-text small-text animate' href='/login'>
              Back to sign in
            </a>
          </FlexBox>
          {(processing && !verified) && (
            <FlexBox center='h-center' className='full-width gray-text large-text margin-bottom-30 bold-text'>
              <FaSpinner className='animate spinner margin-right-20' />
              ...verifying your link
            </FlexBox>
          )}

          {verified && (
            !success ? (
              <form onSubmit={onReset} className='login-form'>
                <InputGroup
                  name='newPassword'
                  label='New Password'
                  type='password'
                />
                <InputGroup
                  name='newPasswordConfirmation'
                  label='Confirm Password'
                  type='password'
                />
                {error && <span className='error-text'>{error}</span>}
                <Button
                  type='submit'
                  className='primary-color large-text access-btn arrow-icon'
                >
                  Sign in
                </Button>
              </form>
            ) : (
              <div className='verified-message-container'>
                <i className='fas fa-check-circle' />
                <span className='verified-label'>
                    you have reset your account password successfully,
                  <br />
                    you will be redirected to the login page.
                </span>
              </div>
            ))}
        </FlexBox>
      </FlexBox>
      <footer className='copyright-text'>
        © LeadCart. All rights reserved 2020
      </footer>
    </FlexBox>
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.user.isLoggedIn
});
export default connect(mapStateToProps, accountActions)(PasswordRest);

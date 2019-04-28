import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as accountActions from 'actions/account';
import { FormLogo } from 'components/common/logos';
import CustomInputField from 'components/CustomInputField';
import './style.css';

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
          history.push('/login');
          setError(message);
        }
      });
    }
  };

  //   if (isLoggedIn) return null;
  return (
    <div className='account-verify-page reset-password-page'>
      {(processing && !verified) && (
        <div
          className='verifying-label big-spinner'
        >
          ...verifying your link
        </div>
      )}
      {verified && (
        !success ? (
          <Fragment>
            <FormLogo />
            <div className='logo-header'>
              <span className='login-header-title'>sign in</span>
              <div className='logo-description'>
              Hello there! Sign in and start managing your products
              </div>
            </div>
            <form onSubmit={onReset} className='form-container'>
              <CustomInputField
                name='newPassword'
                label='New Password'
                type='password'
                placeholder='Enter your email address'
              />
              <CustomInputField
                name='newPasswordConfirmation'
                label='Confirm Password'
                type='password'
                placeholder='Enter your password'
              />
              {error && <span className='login-error-field'>{error}</span>}
              <button disabled={processing} type='submit' className='form-submit'>sign in now</button>
            </form>
          </Fragment>
        )
          : (
            <div className='verified-message-container'>
              <i className='fas fa-check-circle' />
              <span className='verified-label'>
            you have reset your account password successfully,
                <br />
            you will be redirected to the login page.
              </span>
            </div>
          )
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.user.isLoggedIn
});
export default connect(mapStateToProps, accountActions)(PasswordRest);

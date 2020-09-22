import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import * as accountActions from 'actions/account';
import './style.css';


const Verify = ({ isLoggedIn, history, ...props }) => {
  const pathname = history.location.pathname.split('/');
  const hash = pathname[2];

  const [verified, setVerified] = useState(false);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (isLoggedIn) history.push('/');
    if (!hash) history.push('/login');

    setProcessing(true);
    props.verifyUserAccount(
      { hash },
      {
        onSuccess: () => {
          setVerified(true);
          setProcessing(false);

          setTimeout(() => {
            history.push('/login');
          }, 5000);
        },
        onFailed: (message) => {
          setProcessing(false);
          history.push('/login');
        }
      }
    );
    //eslint-disable-next-line
  }, [isLoggedIn]);

  if (isLoggedIn) return null;
  return (
    <div className='account-verify-page'>
      {processing && (
        <div
          className='verifying-label big-spinner'
        >
          ...verifying your email
        </div>
      )}
      {verified && (
        <div className='verified-message-container'>
          <i className='fas fa-check-circle' />
          <span className='verified-label'>
            your account have been verified successfully,
            <br />
            you will be redirected to the login page.
          </span>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({ isLoggedIn: state.user.isLoggedIn });
export default connect(mapStateToProps, accountActions)(Verify);

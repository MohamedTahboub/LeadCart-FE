import React from 'react';

const VerificationPage = (props) => (
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

export default VerificationPage;

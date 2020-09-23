import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const LoadingPage = ({ message }) => (
  <div className='loading-layer'>
    <div className='loading-message'>{message}</div>
  </div>
);

LoadingPage.propTypes = { message: PropTypes.string };
LoadingPage.defaultProps = { message: 'Loading...' };

export default LoadingPage;

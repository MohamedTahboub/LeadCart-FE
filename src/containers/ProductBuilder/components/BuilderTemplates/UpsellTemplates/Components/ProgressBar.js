import React from 'react';
import PropTypes from 'prop-types';

const ProgressBar = ({ value, label, ...props }) => (
  <div className='progress-bar-container'>
    <div className='progress-bar-wrapper'>
      <div className='progress-bar'>
        80% to complete the order
      </div>
    </div>
  </div>
);

ProgressBar.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};


export default ProgressBar;

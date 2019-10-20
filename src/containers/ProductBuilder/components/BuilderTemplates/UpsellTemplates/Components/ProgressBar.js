import React from 'react';
import PropTypes from 'prop-types';

const ProgressBar = ({
  product: {
    pagePreferences: {
      widgets: {
        progressBar: {
          label = 'progress bar label',
          value = '',
          color,
          type,
          enabled
        } = {}
      } = {}
    } = {}
  },
  ...props
}) => (enabled ? (
  <div className='progress-bar-container'>
    <div className='progress-bar-wrapper'>
      <div style={{ width: `${value}%` }} className='progress-bar'>
        {label}
      </div>
    </div>
  </div>
) : null);

ProgressBar.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};


export default ProgressBar;

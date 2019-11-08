import React from 'react';
import PropTypes from 'prop-types';

const ProgressBar = ({
  product: {
    pagePreferences: {
      themeColor = '#8BC34A',
      widgets: {
        progressBar: {
          label = 'progress bar label',
          value = '',
          color = themeColor,
          type,
          enabled
        } = {}
      } = {}
    } = {}
  },
  ...props
}) => {
  const style = {
    backgroundColor: color,
    borderColor: color
  };
  return (enabled ? (
    <div className='progress-bar-container'>
      <div className='progress-bar-wrapper'>
        <div style={{ width: `${value}%`, ...style }} className='progress-bar'>
          {label}
        </div>
      </div>
    </div>
  ) : null);
};
ProgressBar.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};


export default ProgressBar;

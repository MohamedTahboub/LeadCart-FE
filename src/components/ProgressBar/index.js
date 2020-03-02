import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

const getTypeStyles = (type, styles) => styles;


const ProgressBar = ({
  type,
  value = 70,
  styles = {}
}) => {
  const typeStyles = getTypeStyles(type, styles);

  return (
    <div className='progress-bar-body'>
      <div style={{ width: `${value}%` }} className='progress-value'>
        <span className='value'>
          {value}
                    %
        </span>
      </div>
    </div>
  );
};

ProgressBar.propTypes = {

};

export default ProgressBar;

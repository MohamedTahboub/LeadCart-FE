import React from 'react';
import PropTypes from 'prop-types';

import './style.css';
const ShadowBackground = ({ show }) => {
  return show ? (
    <div className='funnel-workspace-shadow' />
  ) :
    null;
};

ShadowBackground.propTypes = { show: PropTypes.bool };

export default ShadowBackground;

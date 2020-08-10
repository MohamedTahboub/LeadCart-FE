
import React from 'react';
import PropTypes from 'prop-types';

import './style.css';
const ShadowBackground = ({ show, setShowNodeSettingModal }) => {
  return show ? (
    <div className='funnel-workspace-shadow' onClick={() => {
      setShowNodeSettingModal(false);
    }}
    />
  ) :
    null;
};

ShadowBackground.propTypes = { show: PropTypes.bool };

export default ShadowBackground;


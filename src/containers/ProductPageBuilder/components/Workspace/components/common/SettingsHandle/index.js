import React from 'react';
import PropTypes from 'prop-types';
import { IoMdSettings } from 'react-icons/io';

import './style.css';

const SettingsHandle = ({ onClick }) => (
  <div className='settings-handle'>
    <IoMdSettings onClick={onClick} className='icon' data-tip='checkout setting' />
  </div>
);


SettingsHandle.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default SettingsHandle;

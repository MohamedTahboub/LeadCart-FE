import React, { useState } from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import config from 'config';
import './style.css';

import {
  DisplayModeButtons
} from './components';

const { USER_SUB_DOMAIN_URL } = config;
const {
  HeaderLogo,
  Button,
  ActivationSwitchInput
} = common;


const Header = ({
  onDisplayChange,
  displayType,
  onChange,
  product,
  subdomain,
  showSandBoxSwitch,
  showDisplayModes,
  history,
  onSave,
  ...props
}) => {
  const navigateToHome = () => {
    history.goBack();
  };

  const onToggleAvailability = () => {
    onChange({
      target: {
        name: 'available',
        value: !product.available
      }
    });
  };
  return (
    <div className='checkout-header '>
      <HeaderLogo
        onClick={navigateToHome}
      />
      {showSandBoxSwitch && <ActivationSwitchInput active={product.available} onToggle={onToggleAvailability} />}
      {showDisplayModes && <DisplayModeButtons onChange={onDisplayChange} type={displayType} />}
      {props.children}
    </div>
  );
};

Header.propTypes = {
  onDisplayChange: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  subdomain: PropTypes.string.isRequired,
  history: PropTypes.objectOf({}),
  product: PropTypes.objectOf({}),
};

Header.defaultProps = {
  history: {},
  product: {},
};

export default Header;
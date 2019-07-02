import React from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import { desktopIcon, mobileIcon, ipadIcon } from '../Icons';

import './style.css';
const {
  HeaderLogo,
  Button,
  ActivationSwitchInput
} = common;

const DisplayMode = ({ onChange }) => (
  <div className='display-controls'>
    <i className='fas fa-desktop zoom-effect display-mode-icon active' />
    <i className='fas fa-tablet-alt zoom-effect display-mode-icon' />
    <i className='fas fa-mobile-alt zoom-effect display-mode-icon' />
  </div>
);
const Header = (props) => (
  <div className='checkout-header'>
    <HeaderLogo />
    <ActivationSwitchInput />
    <DisplayMode />
    <div className='header-buttons'>
      <Button className='primary-btn '>
        <i className='fas fa-code' />
        Show Scripts
      </Button>
      <Button className='primary-btn '>
        <i className='fas fa-share-square' />
        Share
      </Button>
      <Button className='primary-btn '>
        <i className='fas fa-eye' />
        Share
      </Button>
      <Button className='primary-btn '>
        <i className='fas fa-save' />
        Share
      </Button>
    </div>
  </div>
);

Header.propTypes = {

};

export default Header;

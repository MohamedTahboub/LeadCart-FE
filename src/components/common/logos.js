import React from 'react';

import logo from 'assets/images/logo.png';
import logo1 from 'assets/images/logo-1.png';

import formLogo from 'assets/images/big-logo.png';
import formLogoShadow from 'assets/images/big-logo-1.png';


export const FormLogo = () => (
  <span className='logo-container'>
    <img src={formLogo} className='form-logo-image' alt='logo' />
    <img src={formLogoShadow} className='form-logo-image form-logo-shadow' alt='logo shadow' />
  </span>
);

export const Logo = (props) => (
  <span className='logo-container'>
    <img src={logo} className='logo-image' alt='logo' />
    <img src={logo1} className='logo-image logo-shadow' alt='logo shadow' />
  </span>
);


export const HeaderLogo = (props) => (
  <div className='header-logo'>
    <div className='logo-position'>
      <Logo />
      <span className='business-name'>leadcart</span>
    </div>
  </div>
);


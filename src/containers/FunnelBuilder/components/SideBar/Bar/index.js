import React, { useState } from 'react';
import PropTypes from 'prop-types';


import {
  upsellIcon,
  checkoutProductIcon,
  AppearanceIcon,
  conversionsBoostersIcon,
  fulfillmentIcon,
  bumpOfferIcon,
  couponIcon,
  pricingIcon,
  settingsIcon
} from '../../Icons';

// import '../style.css';

const SideButton = ({
  className = '',
  onClick,
  image,
  label,
  id,
  active,
}) => (
  <div
    className={`side-button ${active === id ? 'active' : ''} ${className}`}
    onClick={() => onClick(id)}
    role='presentation'
  >
    <img src={image} alt='side icon' className='side-button-image' />
    <span className='side-button-label'>{label}</span>
  </div>
);

const SideButtons = ({ active, onClick }) => (
  <div className='side-buttons-container funnel-bar'>
    <SideButton
      active={active}
      onClick={onClick}
      image={checkoutProductIcon}
      id='checkouts'
      label='Checkout Products'
    />
    <SideButton
      active={active}
      onClick={onClick}
      image={upsellIcon}
      id='upsells'
      label='Up/Down Sales'
    />

    <SideButton
      className='checkout-wizard-setting-btn'
      active={active}
      onClick={onClick}
      image={settingsIcon}
      id='settings'
      label='Settings'
    />

  </div>
);


SideButtons.propTypes = {

};
export default SideButtons;

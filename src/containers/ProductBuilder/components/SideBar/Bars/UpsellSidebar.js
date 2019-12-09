import React from 'react';


import {
  AppearanceIcon,
  conversionsBoostersIcon,
  fulfillmentIcon,
  pricingIcon,
  settingsIcon
} from '../../Icons';


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
  <div className='side-buttons-container'>
    <SideButton
      active={active}
      onClick={onClick}
      image={AppearanceIcon}
      id='appearance'
      label='Appearance'
    />
    <SideButton
      active={active}
      onClick={onClick}
      image={conversionsBoostersIcon}
      id='conversionsBoosters'
      label='Conversion Boosters'
    />
    <SideButton
      active={active}
      onClick={onClick}
      image={pricingIcon}
      id='pricing'
      label='Pricing'
    />
    <SideButton
      active={active}
      onClick={onClick}
      image={fulfillmentIcon}
      id='fulfillment'
      label='Fulfillment'
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

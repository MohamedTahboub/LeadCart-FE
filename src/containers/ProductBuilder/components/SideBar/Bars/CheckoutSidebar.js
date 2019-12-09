import React from 'react';
// import PropTypes from 'prop-types';


import {
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
      active={active}
      onClick={onClick}
      image={bumpOfferIcon}
      id='bumpOffer'
      label='Bump Offer'
    />
    <SideButton
      active={active}
      onClick={onClick}
      image={couponIcon}
      id='coupon'
      label='Coupons'
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

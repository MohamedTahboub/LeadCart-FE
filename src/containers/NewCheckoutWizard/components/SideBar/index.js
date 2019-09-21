import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Menus from './Menus';

import {
  AppearanceIcon,
  conversionsBoostersIcon,
  fulfillmentIcon,
  bumpOfferIcon,
  couponIcon,
  pricingIcon,
  settingsIcon
} from '../Icons';

import './style.css';

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


const SideBar = (props) => {
  const [activeMenuItem, setActiveMenuItem] = useState('');
  const [open, setOpen] = useState(false);


  const onOpen = () => {
    setOpen(true)
    if (props.onSidebarChange)
    props.onSidebarChange(true)
  }
  const onClose = () => {
    setOpen(false)
    if (props.onSidebarChange)
    props.onSidebarChange(false)
  }

  const onActivateMenuItem = (item) => {
    if (item === activeMenuItem) {
      if (open) {
        onClose()
        return setActiveMenuItem('')
      }
      else {
        onOpen()
      }
    } else {
      onOpen()
    }

    setActiveMenuItem(item);
  };
  return (
    <div className='checkout-nav-sidebar'>

      <SideButtons active={activeMenuItem} onClick={onActivateMenuItem} />

      <div className={`side-menu-container ${open ? 'open' : ''}`}>
        <Menus activeMenu={activeMenuItem} {...props} />
      </div>
    </div>
  );
};

SideBar.propTypes = {

};

export default SideBar;
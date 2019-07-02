import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  AppearanceIcon,
  conversionsBoostersIcon,
  fulfillmentIcon,
  bumpOfferIcon,
  couponIcon,
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

const SideButtons = ({ active, onClick }) => {
  const Button = (props) => <SideButton active={active} onClick={onClick} {...props} />;
  return (
    <div className='side-buttons-container'>
      <Button
        image={AppearanceIcon}
        id='appearance'
        label='appearance'
      />
      <Button
        image={conversionsBoostersIcon}
        id='conversionsBoosters'
        label='Conversion Boosters'
      />
      <Button
        image={fulfillmentIcon}
        id='fulfillment'
        label='fulfillment'
      />
      <Button
        image={bumpOfferIcon}
        id='bumpOffer'
        label='Bump Offer'
      />
      <Button
        image={couponIcon}
        id='coupon'
        label='Coupons'
      />

    </div>
  );
};
const SideBar = (props) => {
  const [activeMenuItem, setActiveMenuItem] = useState('appearance');

  const onActivateMenuItem = (item) => {
    setActiveMenuItem(item);
  };
  return (
    <div className='checkout-nav-sidebar'>

      <SideButtons active={activeMenuItem} onClick={onActivateMenuItem} />

      <div className='side-menu-container' />
    </div>
  );
};

SideBar.propTypes = {

};

export default SideBar;

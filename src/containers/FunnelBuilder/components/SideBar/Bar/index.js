import React, { useState } from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import nodesTemplates from './nodeTemplates';

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

const { FunnelTemplateNode } = common;


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
    <div className='funnel-nodes-schemas'>
      {
        nodesTemplates.map((node) => <FunnelTemplateNode key={node.category} {...node} />)
      }
    </div>

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

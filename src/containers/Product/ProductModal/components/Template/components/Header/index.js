import React from 'react';
import defaultLogo from 'assets/images/logo.png';
import { connect } from 'react-redux';
import common from 'components/common';


import './style.css';

const { FloatButton } = common;

const Header = ({
  companyName = 'LeadCart',
  supportEmail = 'support@leadcart.com',
  logo = defaultLogo,
  color: background = 'rgb(142, 209, 252)',
  onOptionSelected,
  ...props
}) => (
  <div style={{ background }} className='product-template-header'>
    <FloatButton
      onClick={() => onOptionSelected('HeaderOptions')}
    >
      <i className='fas fa-cog' />
    </FloatButton>
    <div className='col-3 company-details-container'>
      {
        logo
          ? <img alt='product' src={logo} className='logo-image' />
          : (
            <span className='campany-name'>
                Company LOGO
            </span>
          )}
    </div>
    <div className='support-component'>
        Need Help?
      <a
        onClick={(e) => e.preventDefault()}
        href={`mailto:${supportEmail}`}
        target='_blank'
        rel='noopener noreferrer'
        className='company-name-support-email'
      >
        {supportEmail}
      </a>
    </div>
  </div>
);
const mapStateToProps = ({
  user: {
    user: {
      subDomain: subdomain
    }
  },
  settings: {
    generalModel: {
      logo,
      supportEmail,
      name: companyName
    }
  }
}) => ({
  companyName,
  supportEmail,
  logo,
  subdomain
});
export default connect(mapStateToProps)(Header);

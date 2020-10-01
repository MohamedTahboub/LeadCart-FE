import React from 'react';
import { connect } from 'react-redux';
import config from 'config';
import common from 'components/common';

import './style.css';
const { FlexBox } = common;

const { brandsDefaults = {} } = config;

const {
  defaultSupportEmail,
  defaultName,
  defaultLogo
} = brandsDefaults;

const Header = ({
  supportEmail,
  logo,
  show = true
}) => show ? (
  <FlexBox
    spaceBetween
    className='p-2'
    center='v-center'
  >
    <img alt='product' src={logo} className='builder-brand-logo' />
    <a
      onClick={(e) => e.preventDefault()}
      href={`mailto:${supportEmail}`}
      target='_blank'
      rel='noopener noreferrer'
      className='not-underlined bold-text large-text support-link'
    >
      {supportEmail}
    </a>
  </FlexBox>
) : null;

Header.defaultProps = {
  companyName: defaultName,
  supportEmail: defaultSupportEmail,
  logo: defaultLogo
  // themeColor: 'rgb(142, 209, 252)'
};

const mapStateToProps = ({
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
  logo
});
export default connect(mapStateToProps)(Header);

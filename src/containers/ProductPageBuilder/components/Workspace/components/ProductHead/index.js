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
  themeColor: background
}) => (
  <FlexBox
    spaceBetween
    className='p-3'
    center='v-center'
    style={{ background }}
  >
    <img alt='product' src={logo} className='builder-brand-logo' />
    <a
      onClick={(e) => e.preventDefault()}
      href={`mailto:${supportEmail}`}
      target='_blank'
      rel='noopener noreferrer'
      className='not-underlined white-text bold-text large-text'
    >
      {supportEmail}
    </a>
  </FlexBox>
);

Header.defaultProps = {
  companyName: defaultName,
  supportEmail: defaultSupportEmail,
  logo: defaultLogo,
  themeColor: 'rgb(142, 209, 252)'
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

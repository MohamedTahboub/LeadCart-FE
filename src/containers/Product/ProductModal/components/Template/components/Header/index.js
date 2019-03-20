import React from 'react';
import defaultLogo from 'assets/images/logo.png'
import { connect } from 'react-redux'
import common from 'components/common'


import './style.css'

const { FloatButton } = common;

const Header = ({
  companyName = 'LeadCart',
  color: background = 'rgb(142, 209, 252)',
  logo = defaultLogo,
  supportEmail = 'support@leadcart.com',
  onOptionSelected,
  ...props
}) => {
  return (
    <div style={{ background }} className="product-template-header">
      <FloatButton
        onClick={() => onOptionSelected('HeaderOptions')}
      >
        <i className="fas fa-cog" />
      </FloatButton>
      <div className="col-3 company-details-container">
        <img alt='product' src={logo} className="logo-image" />
        <span className="campany-name">
          {companyName}
        </span>
      </div>
      <div className="support-component">
        Need Help?
        <a
          onClick={(e) => e.preventDefault()}
          href={`mailto:${supportEmail}`}
          target='_blank'
          rel="noopener noreferrer"
          className='company-name-support-email'
        >
          {supportEmail}
        </a>
      </div>
    </div>
  )
}
const mapStateToprops = ({
  user: {
    user: {
      company,
      email,
      subDomain: subdomain
    }
  },
  settings: {
    generalModel: {
      logo,
      support
    }
  }
}) => ({
  company,
  supportEmail: support || email,
  logo,
  subdomain
})
export default connect(mapStateToprops)(Header);
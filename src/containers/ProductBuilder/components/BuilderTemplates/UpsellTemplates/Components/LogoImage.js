import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import brandDefaultLogo from '../../../../../../assets/images/brands/leadcart-white-bg.png';

const LogoImage = ({ logo, ...props }) => (
  <div className='upsell-head-image'>
    <img src={logo} alt='' className='brand-logo' />
  </div>
);

LogoImage.propTypes = {
  logo: PropTypes.string
};
LogoImage.defaultProps = {
  logo: brandDefaultLogo
};


const mapStateToProps = ({
  settings: {
    generalModel: {
      logo
    }
  }
}) => ({
  logo,
});
export default connect(mapStateToProps)(LogoImage);


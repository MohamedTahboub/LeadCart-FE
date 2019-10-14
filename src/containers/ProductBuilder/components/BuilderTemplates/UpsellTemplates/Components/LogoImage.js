import React from 'react';
import PropTypes from 'prop-types';
import brandDefaultLogo from '../../../../../../assets/images/brands/leadcart-white-bg.png';

const LogoImage = ({ image, ...props }) => (
  <div className='upsell-head-image'>
    <img src={image} alt='' className='brand-logo' />
  </div>
);

LogoImage.propTypes = {
  image: PropTypes.string
};
LogoImage.defaultProps = {
  image: brandDefaultLogo
};
export default LogoImage;

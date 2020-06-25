import React from 'react';

import leadcartLogo from 'assets/images/leadcart-white-brand.png';
import loadingGif from 'assets/images/gifs/circles-menu-1.gif';
import common from 'components/common';

const { FlexBox } = common;

const ServiceConnectAnimation = ({ image }) => (
  image ? (
    <FlexBox flex spaceBetween center='v-center'>
      <img src={leadcartLogo} alt='leadcart logo' className='integration-connection-image leadcart-brand' />
      <img src={loadingGif} alt='leadcart logo' className='integration-connection-image loading-image padding-h-20' />
      <img src={image} alt='leadcart logo' className='integration-connection-image' />
    </FlexBox>
  ) : null
);

export default ServiceConnectAnimation;

import React from 'react';
import PropTypes from 'prop-types';

import {
  LogoImage,
  Title,
  Description,
  MediaAsset,
  Features,
  ProgressBar,
  Note,
  OrderButton,
  DeclineButton
} from '../Components';


const Temp1 = (props) => (
  <div className='upsell-template upsell-temp-1'>
    <LogoImage />
    <div className='flex-container fb-column'>
      <Title />
      <Description />
    </div>
    <MediaAsset />
    <Features />
    <ProgressBar />
    <Note />
    <OrderButton />
    <DeclineButton />
  </div>
);

Temp1.propTypes = {

};

export default Temp1;

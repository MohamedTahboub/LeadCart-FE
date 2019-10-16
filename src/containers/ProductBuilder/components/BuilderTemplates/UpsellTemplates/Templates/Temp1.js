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
      <Title {...props}/>
      <Description {...props}/>
    </div>
    <MediaAsset {...props}/>
    <Features {...props}/>
    <ProgressBar {...props}/>
    <Note {...props}/>
    <OrderButton {...props}/>
    <DeclineButton {...props}/>
  </div>
);

Temp1.propTypes = {

};

export default Temp1;

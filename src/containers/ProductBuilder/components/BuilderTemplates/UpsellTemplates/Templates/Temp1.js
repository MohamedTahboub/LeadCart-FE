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


const Temp1 = ({ className = '', ref, ...props }) => {

  const { backgroundColor } = props.product.pagePreferences
  const style = {
    backgroundColor
  }
  return (
    <div id={props.product._id} className="upsell-wrapper">
      <div style={style} className={`upsell-template upsell-temp-1 ${className}`}>
        <div className='flex-container fb-column'>
          <Description {...props} />
        </div>
        <MediaAsset {...props} />
        <Note {...props} />
        <ProgressBar {...props} />
        <OrderButton {...props} />
        <DeclineButton {...props} />
      </div>
    </div>
  )
};
//        <LogoImage />
//          <Title {...props} />
//   <Features {...props} />
//      <ProgressBar {...props} />
Temp1.propTypes = {

};

export default Temp1;

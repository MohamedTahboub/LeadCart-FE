import React from 'react';
import PropTypes from 'prop-types';
import { MediaAsset } from '../../../common'

import {
  LogoImage,
  // Title,
  Description,
  // Features,
  // ProgressBar,
  Note,
  OrderButton,
  DeclineButton
} from '../Components';


const Temp2 = ({ className = '', ref, ...props }) => {

  const { backgroundColor } = props.product.pagePreferences
  const style = {
    backgroundColor
  }
  return (
    <div ref={ref} style={style} className={`upsell-template upsell-temp-2 ${className}`}>
      <div className="upsell-template-section">
        <MediaAsset {...props} />
      </div>
      <div className="upsell-template-section">
        <div className='flex-container fb-column'>
          <LogoImage />
          <Description {...props} />
        </div>
        <Note {...props} />
        <OrderButton {...props} />
        <DeclineButton {...props} />
      </div>
    </div>
  )
};


//        <Features {...props} />
//        <ProgressBar {...props} />
Temp2.propTypes = {

};

export default Temp2;

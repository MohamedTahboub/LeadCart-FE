import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import { MediaAsset } from '../../../common'

import {
  LogoImage,
  Title,
  Description,
  // MediaAsset,
  Features,
  ProgressBar,
  Note,
  OrderButton,
  DeclineButton
} from '../Components';


const Temp1 = ({ className = '', ref, ...props }) => {

  const { productBackgroundColor } = props.product.pagePreferences
  const style = {
    backgroundColor: productBackgroundColor
  }
  return (
    <div id={props.product._id} className="upsell-wrapper">
      <div style={style} className={`upsell-template upsell-temp-1 ${className}`}>
        <LogoImage />
        <ProgressBar {...props} />
        <div className='flex-container fb-column'>
          <Description {...props} />
        </div>
        <MediaAsset {...props} />
        <Note {...props} />
        <OrderButton {...props} />
        <DeclineButton {...props} />
      </div>
    </div>
  )
};

//   <Features {...props} />
//      <ProgressBar {...props} />
Temp1.propTypes = {

};


export default connect()(Temp1);

import React from 'react';
import scissorImage from 'assets/images/scissors.png'

import './style.css'
const CouponActivation = ({ color: background, ...props }) => {
  return (
    <div className="product-template-coupon-container">
      <div className="coupon-form-head">
        <img src={scissorImage} alt="scissor icon" />
        Coupon
      </div>
      <div className="coupon-activation-form">
        <input
          className='coupon-activation-input'
          name="coupon"
          type="text"
        />
        <input
          style={{ background }}
          type="button"
          value="APPLY"
          className='coupon-apply-btn'
        />

      </div>
    </div>
  );
};

export default CouponActivation;
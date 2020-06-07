import React from 'react';
import scissorImage from 'assets/images/scissors.png';


import './style.css';

const CouponActivation = ({
  language = {},
  color,
  ...props
}) => {
  const {
    coupon: couponTitle,
    applyCoupon = 'APPLY'
  } = language.checkout || {};


  return (
    <div className='product-template-coupon-container'>
      <div className='coupon-form-head'>
        <img src={scissorImage} alt='scissor icon' />
        {couponTitle}
      </div>
      <div className='coupon-activation-form' style={{ borderColor: color }}>
        <input
          className='coupon-activation-input'
          name='coupon'
          type='text'
        />
        <input
          style={{ background: color }}
          type='button'
          value={applyCoupon}
          disabled
          className='coupon-apply-btn'
        />

      </div>
    </div>
  );
};

export default CouponActivation;

import React from 'react';
import scissorImage from 'assets/images/scissors.png';
import common from 'components/common';


import './style.css';

const { FloatButton } = common;
const CouponActivation = ({
  color: background,
  language = {},
  coupons,
  ...props
}) => {
  const {
    coupon: couponTitle,
    applyCoupon = 'APPLY'
  } = language.checkout || {};

  const onDisable = () => {
    props.onChange({
      target: {
        name: 'coupons',
        value: { enabled: !coupons.enabled }
      }
    });
  };

  return (
    coupons.enabled ? (
      <div className='product-template-coupon-container'>
        <FloatButton onClick={onDisable} position={{ left: 0 }}>
          <i className='fas fa-eye-slash' />
        </FloatButton>
        <div className='coupon-form-head'>
          <img src={scissorImage} alt='scissor icon' />
          {couponTitle}
        </div>
        <div className='coupon-activation-form'>
          <input
            className='coupon-activation-input'
            name='coupon'
            type='text'
          />
          <input
            style={{ background }}
            type='button'
            value={applyCoupon}
            className='coupon-apply-btn'
          />

        </div>
      </div>
    )
      : null
  );
};

export default CouponActivation;

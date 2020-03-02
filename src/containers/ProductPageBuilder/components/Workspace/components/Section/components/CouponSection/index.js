import React from 'react';
import scissorImage from 'assets/images/scissors.png';


import './style.css';

const CouponActivation = ({
  language = {},
  section = {},
  ...props
}) => {
  const { styles = {} } = section;
  const {
    coupon: couponTitle,
    applyCoupon = 'APPLY'
  } = language.checkout || {};


  const style = {
    ...styles,
    marginTop: `${styles.marginTop}px`,
    marginBottom: `${styles.marginBottom}px`,
    marginLeft: `${styles.marginLeft}px`,
    marginRight: `${styles.marginRight}px`,
    paddingTop: `${styles.paddingTop}px`,
    paddingBottom: `${styles.paddingBottom}px`,
    paddingLeft: `${styles.paddingLeft}px`,
    paddingRight: `${styles.paddingRight}px`,
  };

  const { borderColor, btnColor } = styles;
  return (
    <div className='product-template-coupon-container' style={style}>
      <div className='coupon-form-head'>
        <img src={scissorImage} alt='scissor icon' />
        {couponTitle}
      </div>
      <div className='coupon-activation-form' style={{ borderColor }}>
        <input
          className='coupon-activation-input'
          name='coupon'
          type='text'
        />
        <input
          style={{ background: btnColor }}
          type='button'
          value={applyCoupon}
          className='coupon-apply-btn'
        />

      </div>
    </div>
  );
};

export default CouponActivation;

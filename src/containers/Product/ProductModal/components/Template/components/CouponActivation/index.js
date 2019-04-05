import React from 'react';
import scissorImage from 'assets/images/scissors.png'
import common from 'components/common'



import './style.css'

const { FloatButton } = common
const CouponActivation = ({ color: background, coupons, ...props }) => {

  const onDisable = () => {
    props.onChange({
      target: {
        name: "checkoutPage.coupons",
        value: { ...coupons, enabled: !coupons.enabled }
      }
    })
  }
  return (
    coupons.enabled ? (
      <div className="product-template-coupon-container">
        <FloatButton onClick={onDisable} position={{ left: 0 }} >
          <i className="fas fa-eye-slash" />
        </FloatButton>
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
    )
      :
      null
  );
};

export default CouponActivation;
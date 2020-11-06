import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import common from 'components/common';
import { InputField } from '../Inputs';
import OrderButton from '../OrderButton';
import { BiHide, BiShow } from 'react-icons/bi';

import './style.css';
const { FlexBox, ResizableInput } = common;

const CouponCodeForm = ({
  haveCouponCodeLabel,
  hideCouponCodeLabel,
  withCouponForm,
  couponCodeBtnText,
  themeColor,
  onChange
}) => {
  const [showForm, setShowForm] = useState(false);

  const onToggle = () => {
    setShowForm((show) => !show);
  };
  return (
    withCouponForm ? (
      <FlexBox column >
        <FlexBox className='parent-hover' flexEnd center='v-center'>
          <ResizableInput
            className='label-content primary-text underlined-text without-hover'
            onChange={onChange}
            name={`${!showForm ? 'texts.haveCouponCodeLabel' : 'texts.hideCouponCodeLabel'}`}
            value={!showForm ? haveCouponCodeLabel : hideCouponCodeLabel}
            style={{ background: 'transparent' }}
            defaultValue={'Edit'}
          />
          {!showForm ? (
            <BiShow onClick={onToggle} className='ml-3 item-clickable show-on-parent-hover' />
          ) : (
            <BiHide onClick={onToggle} className='ml-3 item-clickable show-on-parent-hover' />
          )}
        </FlexBox>

        {showForm && (
          <FlexBox flex className='p-2 my-3' center='v-center'>
            <InputField
              flex
              placeholder='Coupon Code'
            />
            <OrderButton
              text={couponCodeBtnText}
              name={'texts.couponCodeBtnText'}
              className='coupon-custom-btn ml-2'
              onChange={onChange}
              themeColor={themeColor}
            />
          </FlexBox>
        )}
      </FlexBox>
    ) : null);

};

CouponCodeForm.propTypes = {};

export default CouponCodeForm;

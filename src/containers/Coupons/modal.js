import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as couponsActions from 'actions/coupon';
// import propTypes from 'prop-types';
import common from 'components/common';
import { couponSchema } from 'libs/validation';
import { Modal } from 'components/Modals';
import moment from 'moment';
const {
  InputRow,
  Button,
  MainTitle
} = common;


const CouponModal = ({
  edit,
  show,
  onClose,
  products = [],
  coupon: couponData = { products: [] },
  //   coupon,
  ...props
}) => {
  const initCoupon = {
    active: true,
    discount: {
      type: 'Flat'
    },
    duration: moment().format(),
    forAll: true,
    productId: couponData.products && couponData.products[0],
    ...couponData
  };

  const [coupon, setCoupon] = useState(initCoupon);
  const [errors, setErrors] = useState({});


  const onChange = ({ target: { value, name } }) => {
    if (value === 'all') {
      name = 'forAll';
      value = true;
      coupon.productId = 'all';
    } else if (name === 'productId') {coupon.forAll = false;}


    if (name.includes('.')) {
      const [key, nestedKey] = name.split('.');
      const nestedValue = { [nestedKey]: value };
      name = key;
      value = { ...coupon[key], ...nestedValue };
    }
    console.log('coupon', name, value);
    setCoupon({ ...coupon, [name]: value });
    setErrors({});
  };

  const onDateChange = (date) => {
    coupon.duration = date.format();
    setCoupon(coupon);
  };
  const onCouponTypeChange = (value) => {
    let { discount: { percent, amount } = {} } = coupon;
    percent = percent === 0 || !percent ? amount : percent;
    amount = amount === 0 || !amount ? percent : amount;
    setCoupon({
      ...coupon,
      discount: {
        type: value,
        percent,
        amount
      }
    });
  };

  const onValidate = async (coupon) => {
    try {
      const { isValid, value, errors } = await couponSchema(coupon);
      console.log('TCL: onValidate ->  isValid, value, errors', isValid, value, errors);

      console.log(coupon);
      if (!isValid) {
        setErrors(errors);
        return false;
      }
      return value;
    } catch ({ message }) {
      setErrors({ message });
      return false;
    }
  };

  const onCreate = async () => {
    const validCoupon = await onValidate(coupon);

    if (validCoupon) {
      props.createNewCoupon(
        validCoupon,
        {
          onSuccess: () => {
            onClose();
          },
          onFailed: (message) => {
            if (message.includes('Coupons.$code_1 dup')) return setErrors({ message: 'This coupon code is not available,try to pick another one' });
            setErrors({ message });
          }
        }
      );
    }
  };

  const onUpdate = async () => {
    const validCoupon = await onValidate(coupon);
    console.log('TCL: onUpdate -> coupon', coupon);
    console.log('TCL: onUpdate -> validCoupon', validCoupon);

    if (validCoupon) {
      props.editCoupon(
        {
          couponId: coupon._id,
          details: validCoupon
        },
        {
          onSuccess: () => {
            onClose();
          },
          onFailed: (message) => {
            setErrors({ message });
          }
        }
      );
    }
  };

  const { discount } = coupon;
  return (
    <Modal
      onClose={onClose}
      isVisible
    >
      <MainTitle>{edit ? 'Update Coupon' : 'Create Coupon'}</MainTitle>
      <InputRow>
        <InputRow.Label
          error={errors.code}
        >
          Coupon code
        </InputRow.Label>
        <InputRow.CustomInput
          name='code'
          value={coupon.code}
          placeholder='Coupon Code.'
          onBlur={onChange}
          error={errors.code}
        />
        <InputRow.DatePicker
          name='duration'
          type='date'
          disabledDate={(date) => date < (Date.now() - (24 * 60 * 60 * 1000))}
          placeholder='Expiration Date'
          defaultValue={moment(coupon.duration)}
          className='margin-left-30'
          onChange={onDateChange}
        />
      </InputRow>
      <InputRow>
        <InputRow.Label
          error={errors.amount || errors.percent}
        >
          Coupon Type
        </InputRow.Label>
        <InputRow.FlatSelect
          onSelect={onCouponTypeChange}
          value={discount.type}
        />
        <InputRow.PriceField
          value={discount.type === 'Flat' ? discount.amount : discount.percent}
          currency={discount.type === 'Flat' ? '$' : '%'}
          name={discount.type === 'Flat' ? 'discount.amount' : 'discount.percent'}
          onChange={onChange}
          note='How much off is your coupon.'
          className='margin-left-30'
        />
      </InputRow>
      <InputRow margin='35'>
        <InputRow.Label>
          Apply to

        </InputRow.Label>
        <InputRow.SearchInput
          options={products}
          value={typeof coupon.productId !== 'boolean' ? coupon.productId : 'all'}
          target='name'
          name='productId'
          onChange={onChange}
        />
      </InputRow>
      {errors.message && <span className='error-message'>{errors.message}</span>}
      <Button onClick={edit ? onUpdate : onCreate} className='primary-color margin-with-float-right'>
        <i className='fas fa-plus' />
        {`${edit ? 'Update' : 'Create'} Coupon`}
      </Button>
    </Modal>
  );
};


export default connect(null, couponsActions)(CouponModal);

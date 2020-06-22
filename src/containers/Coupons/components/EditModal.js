import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as couponsActions from 'actions/coupon';
import common from 'components/common';
import { couponSchema } from 'libs/validation';
import { Modal } from 'components/Modals';
import moment from 'moment';
import Select from 'react-select';
import * as immutable from 'object-path-immutable';
import { mapListToObject, notification } from 'libs';
import { isFunction } from 'libs/checks';

const {
  InputRow,
  Button,
  MainTitle,
  FlexBox
} = common;

const {
  Label,
  CustomInput,
  DatePicker,
  FlatSelect,
  PriceField
} = InputRow;

const CouponModal = ({
  isEdit,
  onClose,
  coupon: couponData = { products: [] },
  productsLabelsMap,
  ...props
}) => {
  const initCoupon = {
    active: true,
    discount: { type: 'Flat' },
    duration: moment().format(),
    products: [],
    ...couponData
  };

  const [coupon, setCoupon] = useState(initCoupon);
  const [errors, setErrors] = useState({});

  const productsOptions = Object.values(productsLabelsMap);
  const couponProductsLabels = coupon.products.map((productId) => productsLabelsMap[productId]);

  const onChange = (name, value) => {
    const updatedCoupon = immutable.set(coupon, name, value);
    setCoupon(updatedCoupon);
    setErrors({});
  };

  const onFiledChange = ({ target: { value, name } }) => {
    onChange(name, value);
  };

  const onDateChange = (date) => {
    const duration = isFunction(date.format) && date.format();
    onChange('duration', duration);
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
      props.createNewCoupon(validCoupon, {
        onSuccess: () => {
          onClose();
          notification.success(`Coupon with the code ${validCoupon.code} has been created`);
        },
        onFailed: (message) => {
          notification.failed(message);
          setErrors({ message });
        }
      });
    }
  };

  const onUpdate = async () => {
    const validCoupon = await onValidate(coupon);
    if (validCoupon) {
      props.editCoupon(
        {
          couponId: coupon._id,
          details: validCoupon
        },
        {
          onSuccess: () => {
            notification.success(`${validCoupon.code} coupon has been updated`);
            onClose();
          },
          onFailed: (message) => {
            notification.failed(message);
            setErrors({ message });
          }
        }
      );
    }
  };

  const onSelectProducts = (products) => {
    if (!Array.isArray(products) || products === null)
      return onChange('products', []);

    const productsIds = products.map(({ value }) => value);
    onChange('products', productsIds);
  };

  const { discount } = coupon;
  return (
    <Modal
      className='coupon-edit-modal'
      onClose={onClose}
      isVisible
    >
      <MainTitle>{isEdit ? 'Update Coupon' : 'Create Coupon'}</MainTitle>
      <InputRow>
        <Label error={errors.code}>
          Coupon code
        </Label>
        <CustomInput
          name='code'
          value={coupon.code}
          placeholder='Coupon Code.'
          onBlur={onFiledChange}
          error={errors.code}
        />
        <DatePicker
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
        <Label error={errors.discount && (errors.discount.amount || errors.discount.percent)}>
          Coupon Type
        </Label>
        <FlatSelect
          onSelect={onCouponTypeChange}
          value={discount.type}
        />
        <PriceField
          value={discount.type === 'Flat' ? discount.amount : discount.percent}
          currency={discount.type === 'Flat' ? '$' : '%'}
          name={discount.type === 'Flat' ? 'discount.amount' : 'discount.percent'}
          onChange={onFiledChange}
          note='How much off is your coupon.'
          className='margin-left-30'
        />
      </InputRow>
      <InputRow margin='35'>
        <FlexBox center='v-center' flex>
          <Label>
            Apply to
          </Label>
          <Select
            className='select-coupons'
            options={productsOptions}
            target='name'
            name='productId'
            onChange={onSelectProducts}
            value={couponProductsLabels}
            placeholder='All Products'
            isMulti
          />
        </FlexBox>
      </InputRow>
      {errors.message && <span className='error-message'>{errors.message}</span>}
      <Button onClick={isEdit ? onUpdate : onCreate} className='primary-color margin-with-float-right'>
        <i className='fas fa-plus' />
        {`${isEdit ? 'Update' : 'Create'} Coupon`}
      </Button>
    </Modal>
  );
};

const mapStateToProps = ({ products: { products = [] } = {} }) => {
  return { productsLabelsMap: mapListToObject(products, '_id', { name: 'label', _id: 'value' }) };
};


export default connect(mapStateToProps, couponsActions)(CouponModal);

import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as couponsActions from 'actions/coupon';
import common from 'components/common';
import { couponSchema } from 'libs/validation';
import { Modal } from 'components/Modals';
import moment from 'moment';
import Select from 'react-select';

const {
  InputRow,
  Button,
  MainTitle
} = common;

const { Label, CustomInput, DatePicker, FlatSelect, PriceField } = InputRow;

const CouponModal = ({
  edit,
  onClose,
  products = [],
  coupon: couponData = { products: [] },
  productsNames,
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
  const [productValues, setProductValues] = useState([]);

  const onChange = ({ target: { value, name } }) => {
    if (name.includes('.')) {
      const [key, nestedKey] = name.split('.');
      const nestedValue = { [nestedKey]: value };
      name = key;
      value = { ...coupon[key], ...nestedValue };
    }
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
        validCoupon
        ,
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

  React.useEffect(
    () => {
      const getData = async () => {
        const validCoupon = await onValidate(coupon);
        const selectedValues = await validCoupon.products.map((ele) => ({ label: productsNames[ele], value: ele }));
        setProductValues(selectedValues);
      };
      edit && getData();
    }
    , [edit]
  );

  /*
React.useEffect(
  () => {
    const getData = async () => {
      const validCoupon = await onValidate(coupon);
      const selectedValues = await validCoupon.products.map((productID) =>
      products.filter((product) =>
      product.value === productID));
    };
    edit && getData();
  }
  , [edit]
  );
 */


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
            onClose();
          },
          onFailed: (message) => {
            setErrors({ message });
          }
        }
      );
    }
  };


  const selectValues = (values) => {
    const allProducts = Array.isArray(values) &&
      values.filter((ele) =>
        ele.value === 'all').length > 0;

    if (allProducts) {
      setProductValues([]);
      setCoupon({ ...coupon, products: [] });
    } else {
      setProductValues(values);
      setCoupon({ ...coupon, products: values.map((ele) => ele.value) });
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
        <Label
          error={errors.code}
        >
          Coupon code
        </Label>
        <CustomInput
          name='code'
          value={coupon.code}
          placeholder='Coupon Code.'
          onBlur={onChange}
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
        <Label
          error={errors.amount || errors.percent}
        >
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
          onChange={onChange}
          note='How much off is your coupon.'
          className='margin-left-30'
        />
      </InputRow>
      <InputRow margin='35'>
        <Label>
          Apply to
        </Label>

        <Select
          className='select-coupons'
          options={products}
          target='name'
          name='productId'
          onChange={selectValues}
          value={productValues}
          isMulti
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

const mapStateToProps = ({ products: { products = [] } = {} }) => ({
  productsNames: products.reduce((obj, { _id: id, name }) => {
    obj[id] = name;
    return obj;
  }, {})
});


export default connect(mapStateToProps, couponsActions)(CouponModal);

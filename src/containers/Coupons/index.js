import React, { useState, useEffect } from 'react';
import { Modal } from 'components/Modals';
import { connect } from 'react-redux';
import common from 'components/common';
import * as productsActions from 'actions/products';
import * as couponsActions from 'actions/coupon';
import Dialog from 'components/common/Dialog';

import { newCouponSchema } from 'libs/validation';
import Tabel from 'components/common/Tabels';
import moment from 'moment';
import './style.css';
const {
  InputRow,
  Button,
  MainTitle,
  SmallButton,
  Page,
  PageHeader,
  MiniButton,
  PageContent
} = common;

const AddNewButton = ({ onClick, ...props }) => (
  <Button onClick={onClick} className='primary-color medium-add-btn explort-csv-btn'>
    <i className='fas fa-plus' />
    {' '}
    Add new
  </Button>
);

const Coupons = ({
  products,
  coupons,
  errors: { message: errMessage } = {},
  ...props
}) => {
  const productsNames = products.reduce((obj, { _id: id, name }) => {
    obj[id] = name;
    return obj;
  }, {});
  products = [
    { label: 'For All Products', value: 'all' },
    ...products.map(({ _id: value, name: label }) => ({ label, value }))
  ];

  const initCoupon = {
    active: true,
    forAll: true,
    type: 'Flat',
    // amount: 50
  };
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [coupon, setCoupon] = useState(initCoupon);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!showModal) setCoupon(initCoupon);

    if (errors.message !== errMessage) setErrors({ message: errMessage });
  }, [showModal, errMessage]);
  const toggleModal = () => setShowModal(!showModal);

  const onChange = ({ target: { value, name } }) => {
    if (value === 'all') {
      name = 'forAll';
      value = true;
    } else if (name === 'productId') {coupon.forAll = false;}


    if (name.includes('.')) {
      const [key, nestedKey] = name.split('.');
      const nestedValue = { [nestedKey]: value };
      name = key;
      value = { ...coupon[key], ...nestedValue };
    }

    setCoupon({ ...coupon, [name]: value });
    setErrors({});
  };

  const onDiscountTypeChange = (value) => {
    const { amount, percent } = coupon;
    console.log(value, amount, percent);
    setCoupon({
      ...coupon,
      type: value,
      amount: amount || percent,
      percent: percent || amount
    });
  };
  const onDateChange = (date) => {
    coupon.duration = date.format();
    setCoupon(coupon);
  };

  const onSubmit = async () => {
    try {
      const { isValid, value, errors } = await newCouponSchema(coupon);
      console.log(isValid, errors);
      if (!isValid) return setErrors({ ...errors });

      props.createNewCoupon(value, {
        onSuccess: () => {
          setShowModal(false);
        },
        onFailed: ({ message }) => {
          setErrors({ message });
        }
      });
    } catch ({ message }) {
      setErrors({ message });
    }
  };
  const onCouponDelete = (couponId) => {
    props.deleteCoupon({
      couponId
    }, {
      onSuccess: () => {
        setShowDeleteModal('');
      },
      onFailed: (message) => {
        setShowDeleteModal('');
      }
    });
  };
  const { type } = coupon;
  return (
    <Page className='coupons-page'>
      <PageHeader>
        <MainTitle>Coupons</MainTitle>
        <Button onClick={toggleModal} className=' primary-color'>
          New Coupon
        </Button>
      </PageHeader>
      <PageContent>
        <Tabel>
          <Tabel.Head>
            <Tabel.HeadCell>Code</Tabel.HeadCell>
            <Tabel.HeadCell>Type</Tabel.HeadCell>
            <Tabel.HeadCell>Amount/Percent</Tabel.HeadCell>
            <Tabel.HeadCell>For Product</Tabel.HeadCell>
            <Tabel.HeadCell>Created Date</Tabel.HeadCell>
            <Tabel.HeadCell>Status</Tabel.HeadCell>
          </Tabel.Head>
          <Tabel.Body>
            {coupons
              .sort((a, b) => ((new Date(a.createdAt) < new Date(b.createdAt)) ? 1 : -1))
              .map(({
                _id: couponId,
                code,
                discount = {},
                active,
                createdAt,
                products: [productId] = [],
                forAll,
                usedBy
              }, orderInList) => (
                <Tabel.Row key={code} orderInList={orderInList} className='coupon-tabel-row'>
                  <Tabel.Cell mainContent={code} />
                  <Tabel.Cell mainContent={discount.type} />
                  <Tabel.Cell mainContent={discount.type !== 'Percent' ? `${discount.amount}$` : `${discount.percent}%`} />
                  <Tabel.Cell mainContent={forAll === true ? 'All Products' : productsNames[productId]} />
                  <Tabel.Cell mainContent={moment(createdAt).format('YYYY-MM-DD')} />
                  <Tabel.Cell>
                    <SmallButton
                      onClick={() => props.changeCouponState({ couponId, active: !active })}
                      className={active ? 'green-color' : 'gray-color'}
                    >
                      {`${active ? 'Active' : 'Inactive'}`}
                    </SmallButton>
                  </Tabel.Cell>
                  <MiniButton
                    toolTip='Delete'
                    className='coupon-delete-btn'
                    iconClass='fa-trash-alt'
                    onClick={() => setShowDeleteModal(couponId)}
                  />
                </Tabel.Row>
              ))}

          </Tabel.Body>
        </Tabel>
      </PageContent>

      <Modal onClose={toggleModal} isVisible={showModal}>
        <MainTitle>Create Coupon</MainTitle>
        <InputRow>
          <InputRow.Label
            error={errors.code}
          >
            Coupon code
          </InputRow.Label>
          <InputRow.CustomInput
            name='code'
            placeholder='Coupon Code.'
            onBlur={onChange}
            error={errors.code}
          />
          <InputRow.DatePicker
            name='duration'
            type='date'
            disabledDate={(date) => date < (Date.now() - (24 * 60 * 60 * 1000))}
            placeholder='Active Duration'
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
            onSelect={onDiscountTypeChange}
            value={type}
          // defaultValue='Flat'
          />
          <InputRow.PriceField
            value={type === 'Flat' ? coupon.amount : coupon.percent}
            currency={type === 'Flat' ? '$' : '%'}
            name={type === 'Flat' ? 'amount' : 'percent'}
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
            defaultValue={coupon.productId || 'all'}
            target='name'
            name='productId'
            onChange={onChange}
          />
        </InputRow>
        {errors.message && <span className='error-message'>{errors.message}</span>}
        <Button onClick={onSubmit} className='primary-color margin-with-float-right'>
          <i className='fas fa-plus' />
          {' '}
          Create Coupon
        </Button>
      </Modal>
      {showDeleteModal && (
        <Dialog
          title='Coupon Deletion'
          description='Are you sure,you want delete this coupon?'
          show
          onClose={() => setShowDeleteModal('')}
          confirmBtnText='Delete'
          onConfirm={() => onCouponDelete(showDeleteModal)}
        />
      )}
    </Page>
  );
};


const mapStateToProps = ({
  coupons: {
    coupons = [],
    errors
  },
  products: { products = [] } = {}
}) => ({
  errors,
  coupons,
  products
});
export default connect(mapStateToProps, { ...couponsActions, ...productsActions })(Coupons);


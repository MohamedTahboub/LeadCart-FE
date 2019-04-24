import React, { useState } from 'react';
import { Modal } from 'components/Modals';
import { connect } from 'react-redux';
import common from 'components/common';
import * as productsActions from 'actions/products';
import * as couponsActions from 'actions/coupon';
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
  ...props
}) => {
  const productsNames = products.reduce((obj, { _id: id, name }) => {
    obj[id] = name;
    return obj;
  }, {});
  products = products.map(({ _id: value, name: label }) => ({ label, value }));

  const [showModal, setShowModal] = useState(false);
  const [coupon, setCoupon] = useState({});
  const [couponType, setCouponType] = useState('Flat');
  const [errors, setErrors] = useState({});


  const toggleModal = () => setShowModal(!showModal);

  const onChange = ({ target: { value, name } }) => {
    if (value === 'all') {
      name = 'forAll';
      value = true;
    }

    if (name.includes('.')) {
      const [key, nestedKey] = name.split('.');
      const nestedValue = { [nestedKey]: value };
      name = key;
      value = { ...coupon[key], ...nestedValue };
    }

    setCoupon({ ...coupon, [name]: value });
  };

  const onDiscountTypeChange = (value) => {
    onChange({
      target: {
        name: 'discount.type',
        value
      }
    });
  };
  const onDateChange = (date) => {
    coupon.duration = date.format();
    setCoupon(coupon);
  };

  const onSubmit = () => {
    console.log(coupon);
    props.createNewCoupon(coupon, {
      onSuccess: () => {setShowModal(false);},
      onFailed: ({ message }) => {setErrors({ message });}
    });
  };

  const { discount = {} } = coupon;
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
                <Tabel.Row key={code} orderInList={orderInList}>
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
                </Tabel.Row>
              ))}

          </Tabel.Body>
        </Tabel>
      </PageContent>

      <Modal onClose={toggleModal} isVisible={showModal}>
        <MainTitle>Create Coupon</MainTitle>
        <InputRow>
          <InputRow.Label>Coupon code</InputRow.Label>
          <InputRow.CustomInput
            name='code'
            placeholder='Coupon Code.'
            onBlur={onChange}
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
          <InputRow.Label>Coupon Type</InputRow.Label>
          <InputRow.FlatSelect
            onSelect={onDiscountTypeChange}
            value={discount.type || 'Flat'}
            defaultValue='Flat'
          />
          <InputRow.PriceField
            // type={discount.type === 'Flat' ? '$' : '%'}
            name={discount.type === 'Flat' ? 'discount.amount' : 'discount.percent'}
            onChange={onChange}
            note='How much off is your coupon.'
            className='margin-left-30'
          />
        </InputRow>
        <InputRow margin='35'>
          <InputRow.Label>Apply to</InputRow.Label>
          <InputRow.SearchInput
            options={products}
            defaultValue={coupon.product || 'all'}
            target='name'
            name='product'
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
    </Page>
  );
};


const mapStateToProps = ({
  coupons: {
    coupons = [],
  },
  products: { products = [] } = {}
}) => ({
  coupons,
  products
});
export default connect(mapStateToProps, { ...couponsActions, ...productsActions })(Coupons);


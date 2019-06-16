import React, { useState, useEffect } from 'react';
import { Modal } from 'components/Modals';
import { connect } from 'react-redux';
import common from 'components/common';
import * as productsActions from 'actions/products';
import * as couponsActions from 'actions/coupon';
import Dialog from 'components/common/Dialog';

import { couponSchema } from 'libs/validation';

import CouponModal from './modal'

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
  const [editCoupon, setEditCoupon] = useState(false);


  // useEffect(() => {
  //   if (!showModal) setCoupon(initCoupon);

  //   if (errors.message !== errMessage) setErrors({ message: errMessage });
  // }, [showModal, errMessage]);


  const toggleModal = () => {
    setShowModal(!showModal)
    if (showModal && editCoupon)
      setEditCoupon(false)
  }

  // const onChange = ({ target: { value, name } }) => {
  //   if (value === 'all') {
  //     name = 'forAll';
  //     value = true;
  //   } else if (name === 'productId') {coupon.forAll = false;}


  //   if (name.includes('.')) {
  //     const [key, nestedKey] = name.split('.');
  //     const nestedValue = { [nestedKey]: value };
  //     name = key;
  //     value = { ...coupon[key], ...nestedValue };
  //   }

  //   setCoupon({ ...coupon, [name]: value });
  //   setErrors({});
  // };

  // const onDiscountTypeChange = (value) => {
  //   const { amount, percent } = coupon;
  //   setCoupon({
  //     ...coupon,
  //     type: value,
  //     amount: amount || percent,
  //     percent: percent || amount
  //   });
  // };
  // const onDateChange = (date) => {
  //   coupon.duration = date.format();
  //   setCoupon(coupon);
  // };

  // const onSubmit = async () => {
  //   try {
  //     const { isValid, value, errors } = await newCouponSchema(coupon);
  //     if (!isValid) return setErrors({ ...errors });

  //     props.createNewCoupon(value, {
  //       onSuccess: () => {
  //         setShowModal(false);
  //         setCoupon({});
  //       },
  //       onFailed: ({ message }) => {
  //         setErrors({ message });
  //       }
  //     });
  //   } catch ({ message }) {
  //     setErrors({ message });
  //   }
  // };

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


  const showEditModal = (coupon) => {
    setShowModal(true);
    setEditCoupon(coupon);
  };


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
            <Tabel.HeadCell>Expiration Date</Tabel.HeadCell>
            <Tabel.HeadCell>Status</Tabel.HeadCell>
          </Tabel.Head>
          <Tabel.Body>
            {coupons
              .map((coupon, orderInList) => {
                const {
                  _id: couponId,
                  code,
                  discount = {},
                  active,
                  createdAt,
                  products: [productId] = [],
                  forAll,
                  duration,
                  usedBy
                } = coupon;
                return (
                  <Tabel.Row key={code} orderInList={orderInList} className='coupon-tabel-row'>
                    <Tabel.Cell mainContent={code} />
                    <Tabel.Cell mainContent={discount.type} />
                    <Tabel.Cell mainContent={discount.type !== 'Percent' ? `$${discount.amount}` : `${discount.percent}%`} />
                    <Tabel.Cell mainContent={forAll === true ? 'All Products' : productsNames[productId]} />
                    <Tabel.Cell mainContent={moment(duration).format('YYYY-MM-DD')} />
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
                      className='table-row-delete-btn'
                      iconClass='fa-trash-alt'
                      onClick={() => setShowDeleteModal(couponId)}
                    />
                    <MiniButton
                      toolTip='Edit'
                      className='table-row-edit-btn'
                      iconClass='fas fa-edit'
                      onClick={() => showEditModal(coupon)}
                    />
                  </Tabel.Row>
                );
              })}

          </Tabel.Body>
        </Tabel>
      </PageContent>
      {showModal && (
        <CouponModal
          show={showModal}
          edit={editCoupon}
          onClose={toggleModal}
          coupon={editCoupon}
          products={products}
        />
      )}

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


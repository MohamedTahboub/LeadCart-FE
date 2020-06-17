import React, { useState } from 'react';
import { connect } from 'react-redux';
import common from 'components/common';
import * as couponsActions from 'actions/coupon';
import Dialog from 'components/common/Dialog';
import CouponModal from './modal';
import Table from 'components/common/Tables';
import CouponList from './CouponsList';
import './style.css';

const {
  Button,
  MainTitle,
  Page,
  PageHeader,
  PageContent
} = common;

const {
  Head,
  HeadCell,
  Body
} = Table;

const HeadContent = ['Code', 'Type', 'Amount/Percent', 'For Product', 'Expiration Date', 'Status'];

const Coupons = ({
  products,
  ...props
}) => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editCoupon, setEditCoupon] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
    if (showModal && editCoupon)
      setEditCoupon(false);
  };

  const onCouponDelete = (couponId) => {
    props.deleteCoupon({ couponId }, {
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

  const deleteModal = (couponId) => {
    setShowDeleteModal(couponId);
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
        <Table>
          <Head>
            {HeadContent.map((ele) => <HeadCell key={ele}>{ele}</HeadCell>)}
          </Head>

          <Body>
            <CouponList
              showEditModal={showEditModal}
              deleteModal={deleteModal}
            />
          </Body>
        </Table>
      </PageContent>


      {showModal && (
        <CouponModal
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
  products: [{ label: 'For All Products', value: 'all' }
    , ...products.map(({ _id: value, name: label }) => ({ label, value }))]
});

export default connect(mapStateToProps, { ...couponsActions })(Coupons);


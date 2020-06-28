import React, { useState } from 'react';
import { connect } from 'react-redux';
import common from 'components/common';
import * as couponsActions from 'actions/coupon';
import Dialog from 'components/common/Dialog';
import Table from 'components/common/Tables';
import './style.css';
import { notification } from 'libs';
import { CouponList, EditModal } from './components';

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

const Coupons = (props) => {

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
        notification.success('Coupon deleted successfully');
      },
      onFailed: notification.failed
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
        <EditModal
          isEdit={!!editCoupon}
          onClose={toggleModal}
          coupon={editCoupon}
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

export default connect(null, { ...couponsActions })(Coupons);


import React from 'react';
import { SlideModal } from 'components/Modals';
import common from 'components/common';
import Order from './Order';
import { DetailRow } from './common';
import { RoundTow } from 'libs';
import './style.css';

const {
  MainTitle,
  InputRow,
  Title,
  Timeline
} = common;

const CustomerPanelModal = ({
  isVisible,
  onClose,
  customer,
  ...props
}) => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    lifeTimeCharges,
    orders = []
  } = customer;

  return (
    <SlideModal
      isVisible={isVisible}
      onClose={onClose}
      contentClassName='customer-modal-content'
      header={(
        <MainTitle className='upsell-modal-head'>
          Customer Orders History
        </MainTitle>
      )}
    >
      <DetailRow
        label='Customer Name'
        value={`${firstName} ${lastName}`}
      />
      <DetailRow
        label='Customer Email'
        value={email}
      />
      <DetailRow
        label='Phone Number'
        value={phoneNumber}
      />
      <DetailRow
        label='life time charges'
        value={`${RoundTow(lifeTimeCharges)} $`}
      />
      <div className='customer-history-title'>Orders History:</div>
      <div className='customer-orders-history'>
        <Timeline mode='alternate'>
          {orders.map((order) => (
            <Timeline.Item key={order._id}>
              <Order {...order} />
            </Timeline.Item>
          ))}
        </Timeline>
      </div>
    </SlideModal>
  );
};

export default CustomerPanelModal;

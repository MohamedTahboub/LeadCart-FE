import React from 'react';
import { SlideModal } from 'components/Modals';
import common from 'components/common';
import Order from './Order';
import { DetailRow } from './common';
import { RoundTow } from 'libs';
import './style.css';
import { connect } from 'react-redux'

const {
  MainTitle,
  InputRow,
  Title,
  Timeline
} = common;

const CustomerPanelModal = ({
  isVisible,
  ordersItems,
  onClose,
  onOrderRefund,
  customer,
  ...props
}) => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    lifeTimeCharges,
    orders: ordersIds = []
  } = customer;

  const orders = ordersItems.filter(order => ordersIds.includes(order._id));

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
              <Order {...order} onRefund={onOrderRefund} />
            </Timeline.Item>
          ))}
        </Timeline>
      </div>
    </SlideModal>
  );
};
CustomerPanelModal.defaultProps = {
  orders: []
}
const mapStateToProps = ({ orders }) => ({ ordersItems: orders })
export default connect(mapStateToProps)(CustomerPanelModal);

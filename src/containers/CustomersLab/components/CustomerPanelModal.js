import React from 'react';
import { SlideModal } from 'components/Modals';
import common from 'components/common';
import Order from './Order';
import { DetailRow } from './common';
import { RoundTow } from 'libs';
import './style.css';
import { connect } from 'react-redux';
import clx from 'classnames';

const {
  MainTitle,
  Timeline,
  Button
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

  const orders = ordersItems.filter((order) => ordersIds.includes(order._id));

  return (
    <div
      isVisible={isVisible}
      onClose={onClose}
      className={clx('customer-modal-container', { visible: isVisible })}
    >
      <div className='fixed-content'>
        <div className='customer-modal-content'>
          <MainTitle className='upsell-modal-head' mainClassName='fluid'>
            <span className='d-flex justify-content-between'>
              <span>Customer Orders History</span>
              <Button onClick={onClose} className='link-btn'>X</Button>
            </span>
          </MainTitle>
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
            value={`$${RoundTow(lifeTimeCharges)}`}
          />
          <div className='customer-history-title'>Orders History:</div>
          <div className='customer-orders-history'>
            <Timeline>
              {orders.map((order) => console.log('order', order) || (
                <Timeline.Item key={order._id}>
                  <Order {...order} onRefund={onOrderRefund} />
                </Timeline.Item>
              ))}
            </Timeline>
          </div>
        </div>
      </div>
    </div>
  );
};
CustomerPanelModal.defaultProps = { orders: [] };
const mapStateToProps = ({ orders }) => ({ ordersItems: orders });
export default connect(mapStateToProps)(CustomerPanelModal);

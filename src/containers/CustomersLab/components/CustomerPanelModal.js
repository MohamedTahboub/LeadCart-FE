import React, { useState } from 'react';
import { connect } from 'react-redux';
import { MdEmail, MdLocalPhone } from 'react-icons/md';
import { Avatar } from 'antd';
import clx from 'classnames';
import { IoIosCloseCircleOutline } from 'react-icons/io';

import common from 'components/common';
import { getGavatarByEmail, getPriceFormat, includesIgnoreCase } from 'libs';
import Order from './Order';
import './style.css';

const {
  InputRow,
  Timeline,
  FlexBox
} = common;

const { TextField } = InputRow;

const filterOrderByKey = (key) => ({ products = [] }) => {
  if (!key) return true;
  const searchText = products.map((p) => p.name).join(' ');
  return includesIgnoreCase(searchText, key);
};

const CustomerPanelModal = ({
  isVisible,
  ordersItems,
  onClose,
  onOrderRefund,
  customer
}) => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    lifeTimeCharges,
    orders: ordersIds = []
  } = customer;
  const [searchKey, setSearchKey] = useState('');
  const orders = ordersItems
    .filter((order) => ordersIds.includes(order._id))
    .filter(filterOrderByKey(searchKey));
  const onSearch = ({ target: { value } }) => setSearchKey(value);

  const customerImage = getGavatarByEmail(email);
  const totalPurchases = getPriceFormat(lifeTimeCharges, 'USD', 'amount_with_comma_separator');
  return (
    <div
      isVisible={isVisible}
      onClose={onClose}
      className={clx('customer-modal-container', { visible: isVisible })}
    >
      <div className='fixed-content'>
        <div className='customer-modal-content'>
          <FlexBox flexEnd flex>
            <IoIosCloseCircleOutline onClick={onClose} className='item-clickable larger-text' />
          </FlexBox>

          <FlexBox center='v-center' className='m-2'>
            <Avatar size={90} src={customerImage} />
            <FlexBox column className='ml-3'>
              <span className='larger-text bold-text gray text'>
                {`${firstName} ${lastName}`}
              </span>
              <FlexBox center='v-center' className='large-text gray text'>
                <MdEmail className='mr-1' />
                {email}
              </FlexBox>
              <FlexBox center='v-center' className='large-text gray text'>
                <MdLocalPhone className='mr-1' />
                {phoneNumber}
              </FlexBox>
            </FlexBox>
          </FlexBox>

          <FlexBox column className='aligned-center'>
            <span className='gray-text'>Total Purchases</span>
            <span className='larger-text bold-text' >
              {`${totalPurchases}`}
            </span>
          </FlexBox>

          <FlexBox center='v-center' className='p-2 white-bg' flex>
            <TextField
              value={searchKey}
              onChange={onSearch}
              className='flex mx-2 full-width'
              placeHolder='Search orders history'
            />
            <span className='bold-text' data-tip='orders number'>
              {orders.length}
            </span>
          </FlexBox>
          <div className='customer-orders-history'>
            <Timeline>
              {orders.map((order) => (
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

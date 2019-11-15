import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import common from 'components/common';
import Table from 'components/common/Tables';
import './style.css';
import { getCurrencySymbol, RoundTow } from 'libs';
import PropTypes from 'prop-types';
import OrderRow from './OrderRow'

const { Avatar, SmallButton, MainTitle } = common;



const OrderList = ({ orders, ...props }) => (
  <Table>
    <Table.Head>
      <Table.SmallCell />
      <Table.HeadCell>Order #</Table.HeadCell>
      <Table.HeadCell>Checkout Product</Table.HeadCell>
      <Table.HeadCell>Customer</Table.HeadCell>
      <Table.HeadCell>Total Charge</Table.HeadCell>
      <Table.HeadCell>Processor</Table.HeadCell>
    </Table.Head>
    <Table.Body>
      {orders.map((order, orderInList) => (
        <OrderRow {...order} orderInList={orderInList} />
      ))}
    </Table.Body>
  </Table>
);
OrderList.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.object)
};
OrderList.defaultProps = {
  orders: []
};
export default OrderList;

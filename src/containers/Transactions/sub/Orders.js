import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import common from 'components/common';
import Table from 'components/common/Tables';
import './style.css';
import { getCurrencySymbol, RoundTow } from 'libs';
import PropTypes from 'prop-types';

const { Avatar, SmallButton, MainTitle } = common;


const PaymentTypeIcon = ({ type }) => {
  const icon = {
    Stripe: <i className='fas fa-credit-card' />,
    COD: <i className='fas fa-money-bill-alt' />,
    Paypal: <i className='fab fa-cc-paypal' />
  }[type];

  return icon || null;
};

const OrderList = ({ orders, ...props }) => (
  <Table>
    <Table.Head>
      <Table.SmallCell />
      <Table.HeadCell>Name</Table.HeadCell>
      <Table.HeadCell>Email</Table.HeadCell>
      <Table.HeadCell>Product Name</Table.HeadCell>
      <Table.HeadCell>Total Charge</Table.HeadCell>
      <Table.HeadCell>Paid with</Table.HeadCell>
      <Table.HeadCell>Order Type</Table.HeadCell>
    </Table.Head>
    <Table.Body>
      {orders.map(({
        customer: {
          firstName,
          lastName,
          email,
          phoneNumber
        },
        product: {
          price = {},
          name: productName,
          offer = {},

        } = {},
        payment: {
          paymentType,
          paymentMethod
        },
        totalCharge
      }, orderInList) => (
        <Table.Row orderInList={orderInList}>
          <Table.SmallCell>
            <Avatar name={`${firstName}`} />
          </Table.SmallCell>
          <Table.Cell mainContent={`${firstName} ${lastName}`} />
          <Table.Cell mainContent={email} subContent={phoneNumber} />
          <Table.Cell mainContent={productName} subContent={offer.name ? `with offer: ${offer.name}` : ''} />
          <Table.Cell mainContent={`${getCurrencySymbol(price.currency)} ${RoundTow(totalCharge)}`} />
          <Table.Cell
            mainContent={<PaymentTypeIcon type={paymentMethod} />}
            subContent={paymentMethod}
          />
          <Table.Cell mainContent={paymentType} />

        </Table.Row>
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

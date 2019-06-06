import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import common from 'components/common';
import Tabel from 'components/common/Tabels';
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
  <Tabel>
    <Tabel.Head>
      <Tabel.SmallCell />
      <Tabel.HeadCell>Name</Tabel.HeadCell>
      <Tabel.HeadCell>Email</Tabel.HeadCell>
      <Tabel.HeadCell>Product Name</Tabel.HeadCell>
      <Tabel.HeadCell>Total Charge</Tabel.HeadCell>
      <Tabel.HeadCell>Paid with</Tabel.HeadCell>
      <Tabel.HeadCell>Order Type</Tabel.HeadCell>
    </Tabel.Head>
    <Tabel.Body>
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
        <Tabel.Row orderInList={orderInList}>
          <Tabel.SmallCell>
            <Avatar name={`${firstName}`} />
          </Tabel.SmallCell>
          <Tabel.Cell mainContent={`${firstName} ${lastName}`} />
          <Tabel.Cell mainContent={email} subContent={phoneNumber} />
          <Tabel.Cell mainContent={productName} subContent={offer.name ? `with offer: ${offer.name}` : ''} />
          <Tabel.Cell mainContent={`${getCurrencySymbol(price.currency)} ${RoundTow(totalCharge)}`} />
          <Tabel.Cell
            mainContent={<PaymentTypeIcon type={paymentMethod} />}
            subContent={paymentMethod}
          />
          <Tabel.Cell mainContent={paymentType} />

        </Tabel.Row>
      ))}
    </Tabel.Body>
  </Tabel>
);
OrderList.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.object)
};
OrderList.defaultProps = {
  orders: []
};
export default OrderList;

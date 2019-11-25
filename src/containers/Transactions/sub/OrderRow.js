import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import Table from 'components/common/Tables';
import './style.css';
import moment from 'moment';

import { getCurrencySymbol, RoundTow } from 'libs';
import common from 'components/common';
import { spawn } from 'child_process';

const { Avatar, SmallButton, MainTitle } = common;


// const getCheckoutProduct = (products = []) => products.find(({ category }) => category === 'checkout') || {};
// const getCurrency = (products) => {
//   const product = products.find(({ payment: { price: { currency } = {} } = {} }) => currency);
//   console.log(product.payment && product.payment.price);
//   return product ? product.payment.price.currency : 'USD';
// };

const PaymentTypeIcon = ({ type }) => {
  const icon = {
    Stripe: <i className='fas fa-credit-card' />,
    COD: <i className='fas fa-money-bill-alt' />,
    Paypal: <i className='fab fa-cc-paypal' />
  }[type];

  return icon || null;
};


const OrderRow = ({
  orderInList,
  orderNumber,
  customer: {
    firstName,
    lastName,
    email,
    phoneNumber
  } = {},
  products = [],
  product = {}, // deprecated - for backward compatibility
  paymentMethod,
  createdAt,
  totalCharge = 0
}) => {
  const productsCount = products.length;
  const [expand, setExpand] = useState(false);

  const onToggleExpand = () => {
    setExpand((expand) => !expand);
  };
  // const currency = getCurrency(products);

  return (
    <Table.Row
      orderInList={orderInList}
      subRow={expand && products.map((product) => (
        <Table.Row>
          {product.name}
        </Table.Row>
      ))}
    >
      <Table.Cell
        mainContent={`#LC-${orderNumber}`}
        sideContent={productsCount ? (
          <span className='row-expand' role='presentation'>
            <i className={`fas fa-caret-${expand ? 'up' : 'down'}`} />
          </span>
        ) : null}
      />
      <Table.Cell mainContent={productsCount} />
      <Table.Cell
        mainContent={`${firstName} ${lastName}`}
        subContent={email}
      />
      <Table.Cell mainContent={`$ ${RoundTow(totalCharge)}`} />
      <Table.Cell
        mainContent={<PaymentTypeIcon type={paymentMethod} />}
        subContent={paymentMethod}
      />
      <Table.Cell mainContent={moment(createdAt).format('MMM DD YYYY')} />
    </Table.Row>
  );
};
OrderRow.propTypes = {

};
// getCurrencySymbol(checkoutProduct && checkoutProduct.payment.currency)}
export default OrderRow;
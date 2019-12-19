import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import Table from 'components/common/Tables';
import './style.css';
import moment from 'moment';

import { RoundTow } from 'libs';


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
  } = {},
  products = [],
  paymentMethod,
  createdAt,
  totalCharge = 0
}) => {
  const productsCount = products.length;
  const [expand, setExpand] = useState(false);
  // eslint-disable-next-line
  const onToggleExpand = () => {
    setExpand((expand) => !expand);
  };
  // const currency = getCurrency(products);

  return (
    <Table.Row
      orderInList={orderInList}
      subRow={expand && (
        <Table subTable>
          <Table.Head>
            <Table.HeadCell>Product Name</Table.HeadCell>
            <Table.HeadCell>Price</Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {products.map((product) => (
              <Table.Row>
                <Table.Cell mainContent={product.name} />
                <Table.Cell mainContent={product.price && product.price.amount} />
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
    >
      <Table.Cell
        mainContent={`#LC-${orderNumber}`}
        sideContent={productsCount ? (
          <span onClick={onToggleExpand} className='row-expand' role='presentation'>
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

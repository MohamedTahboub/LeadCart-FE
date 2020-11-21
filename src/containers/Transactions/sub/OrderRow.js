import React, { Fragment, useState } from 'react';
import { downloadFile, getPriceWithCurrency, notification } from 'libs';
import Table from 'components/common/Tables';
import './style.css';
import moment from 'moment';
import * as invoicingActions from 'actions/invoicing';
import { connect } from 'react-redux';
import { FlexBox } from 'components/common/boxes';
import { Button } from 'components/common/Buttons';
import clx from 'classnames';

const PaymentTypeIcon = ({ type }) => {
  const icon = {
    Stripe: <i className='fas fa-credit-card' />,
    COD: <i className='fas fa-money-bill-alt' />,
    Paypal: <i className='fab fa-cc-paypal' />
  }[type];

  return icon || null;
};

const ProductRow = ({ name, price, offers = [], currency, className }) => {

  const hasOffers = Boolean(Array.isArray(offers) && offers.length);
  return (
    <Fragment>
      <Table.Row className={clx(className, { 'with-relative-rows': hasOffers })}>
        <Table.Cell mainContent={name} mainCellClassName='truncate'/>
        <Table.Cell mainContent={getPriceWithCurrency(price, currency)} />
      </Table.Row>
      {hasOffers &&
        (<FlexBox column >
          {offers.map(({ id, name, price }) => (
            <ProductRow
              key={id}
              name={`→ ${name} ${name} ${name} ${name}${name}${name}${name}`}
              price={price}
              className={clx('ml-3', { 'with-relative-rows': hasOffers })}
              currency={currency}
            />
          ))}
        </FlexBox>
        )}
    </Fragment>
  );
};

const OrderRow = ({
  orderInList,
  orderNumber,
  _id: orderId,
  customer: {
    firstName,
    lastName,
    email
  } = {},
  products = [],
  paymentMethod,
  createdAt,
  currency,
  generateOrderInvoice,
  totalCharge = 0,
  ...reset
}) => {
  const productsCount = products.length;
  const [expand, setExpand] = useState(false);
  // eslint-disable-next-line
  const onToggleExpand = () => {
    setExpand((expand) => !expand);
  };
  // const currency = getCurrency(products);

  const onDownloadOrderInvoice = () => {
    generateOrderInvoice({ orderId }, {
      onSuccess: ({ invoice }) => {
        downloadFile(invoice);
        notification.success(`An invoice downloaded for order #${orderNumber}`);
      },
      onFailed: (message) => {
        notification.failed(message);
      }
    });
  };

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
            <FlexBox column>
              {products.map((product) => (
                <ProductRow key={product._id} {...product} currency={currency} />
              ))}
              <FlexBox flex center='h-center' className='mt-3'>
                <Button className='primary-btn px-3' onClick={onDownloadOrderInvoice}>Download Order Invoice</Button>
              </FlexBox>
            </FlexBox>
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
      <Table.Cell mainContent={getPriceWithCurrency(totalCharge, currency)} />
      <Table.Cell
        mainContent={<PaymentTypeIcon type={paymentMethod} />}
        subContent={paymentMethod}
      />
      <Table.Cell mainContent={moment(createdAt).format('MMM DD YYYY')} />
    </Table.Row>
  );
};
OrderRow.propTypes = {};
export default connect(null, invoicingActions)(OrderRow);

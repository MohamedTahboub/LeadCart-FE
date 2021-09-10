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
import { FaFileInvoiceDollar } from 'react-icons/fa';

const PaymentTypeIcon = ({ type }) => {
  const icon = {
    Stripe: <i className='fas fa-credit-card' />,
    COD: <i className='fas fa-money-bill-alt' />,
    Paypal: <i className='fab fa-cc-paypal' />
  }[type];

  return icon || null;
};

const ProductRow = ({ name, price, offers = [], coupon = {}, currency, className, payment = {} }) => {
  const hasDiscount = coupon.discount > 0;

  const hasOffers = Boolean(Array.isArray(offers) && offers.length);
  return (
    <Fragment>
      <Table.Row className={clx(className, { 'with-relative-rows': hasOffers })}>
        <Table.Cell mainContent={name} mainCellClassName='truncate' />
        <Table.Cell
          mainContent={getPriceWithCurrency(price, currency)}
        />
      </Table.Row>
      {hasOffers &&
        (<FlexBox column >
          {offers.map(({ id, name, price }) => (
            <ProductRow
              key={id}
              name={`(Offer) → ${name}`}
              price={price}
              className={clx('ml-3', { 'with-relative-rows': hasOffers })}
              currency={currency}
            />
          ))}
        </FlexBox>
        )}
      {hasDiscount && (
        <ProductRow
          name={`(Coupon) → ${coupon.code}`}
          price={coupon.discount}
          className={clx('ml-3', { 'with-relative-rows': hasOffers })}
          currency={currency}
        />
      )}
    </Fragment>
  );
};

const TotalRows = ({ total, tax = {}, currency, shipping = {} }) => {
  const hasTaxes = tax.taxAmount > 0;
  const hasShipping = shipping.cost > 0;

  const trimedTaxesAndShipping = (hasTaxes ? tax.taxAmount : 0) + (hasShipping ? shipping.cost : 0);
  const subTotal = total - trimedTaxesAndShipping;

  return (
    <Fragment>
      {(hasTaxes || hasShipping) && (
        <Fragment>
          <ProductRow name='Subtotal' price={subTotal} currency={currency} className='sub-total-row' />
          {hasShipping && (
            <ProductRow name={shipping.name} price={shipping.cost} currency={currency} />
          )}
          {hasTaxes && (
            <ProductRow name={`${tax.name} (${tax.rate}%)`} price={tax.taxAmount} currency={currency} />
          )}
        </Fragment>
      )}
      <ProductRow name='Total' price={total} currency={currency} className='total-row' />
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
  tax = {},
  generateOrderInvoice,
  totalCharge = 0,
  shippingMethod = {},
  ...reset
}) => {
  const productsCount = products.length;
  const [expand, setExpand] = useState(false);
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line
  const onToggleExpand = () => {
    setExpand((expand) => !expand);
  };
  // const currency = getCurrency(products);

  const onDownloadOrderInvoice = () => {
    setLoading(true);
    generateOrderInvoice({ orderId }, {
      onSuccess: ({ invoice }) => {
        downloadFile(invoice);
        setLoading(false);
        notification.success(`An invoice downloaded for order #${orderNumber}`);
      },
      onFailed: (message) => {
        notification.failed(message);
        setLoading(false);
      }
    });
  };

  return (
    <Table.Row
      orderInList={orderInList}
      subRow={expand && (
        <Table subTable>
          <Table.Head className='underlined'>
            <Table.HeadCell>Product Name</Table.HeadCell>
            <Table.HeadCell>Price</Table.HeadCell>
          </Table.Head>
          <Table.Body>
            <FlexBox column>
              {products.map((product) => (
                <ProductRow key={product._id} {...product} currency={currency} />
              ))}
              <TotalRows total={totalCharge} currency={currency} tax={tax} shipping={shippingMethod} />
              <FlexBox flex center='h-center' className='mt-3'>
                <Button onprogress={loading} className='light-btn px-3' onClick={onDownloadOrderInvoice}>
                  <FlexBox center='v-center'>
                    <FaFileInvoiceDollar color='gray' size={16} />
                    <span className='ml-2'>
                      Order Invoice
                    </span>
                  </FlexBox>
                </Button>
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

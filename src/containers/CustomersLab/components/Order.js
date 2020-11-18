import React from 'react';
import { RoundTow, downloadFile, getCurrencySymbol, notification } from 'libs';
import { ReceiptRow } from './common';
import razorpayLogo from 'assets/images/brands/razorpay-logo.svg';
import { FaFileInvoiceDollar } from 'react-icons/fa';
import * as invoicingActions from 'actions/invoicing';
import { connect } from 'react-redux';
import common from 'components/common';
import ProductRow from './ProductRow';

const { Tooltip } = common;
const PaymentTypeIcon = ({ type, className = '' }) => {
  const icon = {
    Stripe: <i className={`fas fa-credit-card ${className}`} />,
    COD: <i className={`fas fa-money-bill-alt ${className}`} />,
    Paypal: <i className={`fab fa-cc-paypal ${className}`} />,
    Razorpay: <img src={razorpayLogo} className={`razorpay-order-flag ${className}`} />
  }[type];

  return icon || null;
};


const Order = ({
  _id: orderId,
  orderNumber,
  onRefund,
  totalCharge,
  defaultCurrency,
  paymentMethod,
  currency = defaultCurrency,
  product = {},
  products = [],
  generateOrderInvoice
}) => {
  if (product.name && !products.length) products.push(product);

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

  const currencySymbol = getCurrencySymbol(currency);
  return (
    <div className='customer-order-card'>
      <Tooltip text='download an invoice for this order' placement='right'>
        <FaFileInvoiceDollar onClick={onDownloadOrderInvoice} className='order-invoice-icon' />
      </Tooltip>
      <div className='order-code'>{`#LC-${orderNumber}`}</div>
      <PaymentTypeIcon type={paymentMethod} className='order-payment-method-icon' />
      {
        products.map((product) => (
          <ProductRow
            {...product}
            onRefund={onRefund}
            currency={currency}
            orderId={orderId}
          />))
      }
      <ReceiptRow
        className='receipt-total'
        label='Total'
        value={`${currencySymbol} ${RoundTow(totalCharge)}`}
      />
    </div>
  );
};

export default connect(null, invoicingActions)(Order);

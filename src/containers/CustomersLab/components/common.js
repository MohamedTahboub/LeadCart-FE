import React, { Fragment } from 'react';
import common from 'components/common';
import { getPaymentStatusDetails } from 'libs';
const { Badge, Tooltip } = common;

export const ReceiptRow = ({
  className = '',
  label,
  value,
  subRow,
  status,
  prefix = ''
}) => (
  <Fragment>
    <div className={`order-receipt-row ${className}`}>
      <span className='order-receipt-name '>
        {prefix}
        <span>{label}</span>
      </span>
      {status}
      <span className='order-receipt-value'>{value}</span>
    </div>
    {subRow}
  </Fragment>
);


export const DetailRow = ({ className = '', label, value }) => (
  <div className={`customer-details-row ${className}`}>
    <span className='customer-detail-label'>
      {label}:
    </span>
    <span className='customer-detail-value'>{value}</span>
  </div>
);

const getClearText = (text) => {
  if (typeof text !== 'string') return '';

  return text.replace(/\_|\-| /ig, ' ');
};

export const OrderStatusBadge = ({ status }) => {
  const {
    type,
    tip: tipText
  } = getPaymentStatusDetails(status);

  if (!type) return null;

  const friendlyStatus = getClearText(status);
  return (
    <Tooltip text={tipText} placement='top'>
      <Badge type={type} size='small' className='capitalized-text'>
        {friendlyStatus}
      </Badge>
    </Tooltip>
  );
};

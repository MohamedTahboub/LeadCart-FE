import React, { Fragment } from 'react';

export const ReceiptRow = ({
  className = '',
  label,
  value,
  subRow,
  prefix = ''
}) => (
  <Fragment>
    <div className={`order-receipt-row ${className}`}>
      <span className='order-receipt-name'>
        {prefix}
        <span>{label}</span>
      </span>
      <span className='order-receipt-value'>{value}</span>
    </div>
    {subRow}
  </Fragment>
);


export const DetailRow = ({ className = '', label, value }) => (
  <div className={`customer-details-row ${className}`}>
    <span className='customer-detail-label'>
      {label}
:
    </span>
    <span className='customer-detail-value'>{value}</span>
  </div>
);

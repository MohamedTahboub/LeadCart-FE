import React from 'react'

export const ReceiptRow = ({ className = '', label, value, prefix = '' }) => (
  <div className={`order-receipt-row ${className}`}>
    <span className="order-receipt-name">
      {`${prefix ? prefix + ': ' : ''}`}
      <span>{label}</span>
    </span>
    <span className="order-receipt-value">{value}</span>
  </div>
);


export const DetailRow = ({ className = '', label, value }) => (
  <div className={`customer-details-row ${className}`}>
    <span className="customer-detail-label">{label}:</span>
    <span className="customer-detail-value">{value}</span>
  </div>
)
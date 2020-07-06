import React from 'react';
export default [
  {
    label: 'Gross Revenue',
    name: 'grossRevenue',
    prefix: '$'
  },

  {
    label: 'Views',
    name: 'views',
    prefix: <i className='fas fa-eye' />,
    labelFormat: '0'
  },

  {
    label: 'Sales',
    name: 'salesNumber',
    labelFormat: '0'
  },

  {
    label: 'Net Revenue',
    name: 'netRevenue',
    prefix: '$'
  },

  {
    label: 'Cart Conversion',
    name: 'conversionRate',
    suffix: '%',
    labelFormat: '0.0'
  },

  {
    label: 'Refunds',
    name: 'refundsNumber',
    labelFormat: '0',
    warning: true
  },

  {
    label: 'Refund Rate',
    name: 'refundRate',
    suffix: '%',
    labelFormat: '0.0',
    warning: true

  },

  {
    label: 'Cart Abandonments',
    name: 'cartAbandonments',
    labelFormat: '0'
  },

  {
    label: 'Abandonments Rate',
    name: 'abandonmentsRate',
    suffix: '%',
    labelFormat: '0.0'
  }
];



export default {
  defaultCardsSettings: {
    sales: [
      { value: 'dailyAvg', label: 'Average Daily Revenue', show: true },
      { value: 'transactions', label: 'Total Transactions', show: true },
      { value: 'grossRevenue', label: 'Gross Revenue', show: true },
      { value: 'netRevenue', label: 'Net Revenue', show: true },
      {
        value: 'customers', label: 'Total Customers', disabled: true, show: false
      },
      {
        value: 'newCustomers', label: 'New Customers', disabled: true, show: false
      },
      {
        value: 'annualRevenue', label: 'Annual Revenue', disabled: true, show: false
      },
      { value: 'conversionRate', label: 'Conversion Rate', show: true },
      { value: 'views', label: 'Checkout Views', show: true },
    ],
    refunds: [
      { value: 'refunds', label: 'Refunds', show: true },
      { value: 'refundRate', label: 'Refund Rate', show: true },
      {
        value: 'refundAmount', label: 'Refund Amount', show: false
      },
      {
        value: 'refundedCustomers', label: 'Refunded Customers', disabled: true, show: false
      },
    ]
  },
  displayMainChart: true
};

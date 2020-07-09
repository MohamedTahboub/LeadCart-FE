

const settings = {
  defaultCardsSettings: {
    sales: [
      { value: 'dailyAvg', label: 'Average Daily Revenue', show: true },
      { value: 'transactions', label: 'Total Transactions', show: true, format: '0' },
      { value: 'grossRevenue', label: 'Gross Revenue', show: true, format: '0.00' },
      { value: 'netRevenue', label: 'Net Revenue', show: true, format: '0.00' },
      { value: 'customers', label: 'Total Customers', disabled: true, show: false, format: '0' },
      { value: 'newCustomers', label: 'New Customers', disabled: true, show: false, format: '0' },
      { value: 'annualRevenue', label: 'Annual Revenue', disabled: true, show: false },
      { value: 'conversionRate', label: 'Conversion Rate', show: true, format: '0.0' },
      { value: 'views', label: 'Checkout Views', show: true, format: '0' }
    ],
    refunds: [
      { value: 'refunds', label: 'Refunds', show: true, format: '0' },
      { value: 'refundRate', label: 'Refund Rate', show: true, format: '0.0' },
      { value: 'refundsAmount', label: 'Refunds Amount', show: false },
      { value: 'refundedCustomers', label: 'Refunded Customers', disabled: true, show: false, format: '0' }
    ]
  },
  displayMainChart: true
};

export default settings;

export const getLabelByValue = (value) => {
  let label = settings.defaultCardsSettings.sales.find(({ value: v }) => v === value);

  if (!label) label = settings.defaultCardsSettings.refunds.find(({ value: v }) => v === value);

  return label ? label.label : value;
};

export const getFormatByValue = (value) => {
  let format = settings.defaultCardsSettings.sales.find((ele) => value === ele.value);
  if (!format) format = settings.defaultCardsSettings.refunds.find((ele) => value === ele.value);

  return format && format.format ? format.format : null;
};


import moment from 'moment';

export default {
  today: {
    min: moment().subtract(1, 'days').endOf('day'),
    max: moment()
  },
  yesterday: {
    min: moment().subtract(1, 'days'),
    max: moment().format()
  },
  weekToDate: {
    min: moment().subtract(7, 'days').endOf('day'),
    max: moment().format()
  },
  lastWeek: {
    min: moment().subtract(7, 'days'),
    max: moment().format()
  },
  monthToDate: {
    min: moment().subtract(1, 'months').endOf('month'),
    max: moment().format()
  },
  lastMonth: {
    min: moment().subtract(1, 'months'),
    max: moment().format()
  },
  last3Months: {
    min: moment().subtract(3, 'months'),
    max: moment().format()
  },
  last6Months: {
    min: moment().subtract(6, 'months'),
    max: moment().format()
  },
  yearToDate: {
    min: moment().subtract(1, 'years').endOf('year'),
    max: moment().format()
  },
  lastYear: {
    min: moment().subtract(1, 'years'),
    max: moment().format()
  },
  currentFinancialYear: {
    min: moment().subtract(1, 'years').endOf('year'),
    max: moment().format()
  },
  previousFinancialYear: {
    min: moment().subtract(2, 'years').endOf('year'),
    max: moment().subtract(1, 'years').endOf('year')
  },
  all: {
    min: undefined,
    max: undefined
  },
};

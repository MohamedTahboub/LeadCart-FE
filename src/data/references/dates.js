import moment from 'moment';

export default {
  today: {
    min: moment().format('YYYY-MM-DD')
  },
  yesterday: {
    min: moment().subtract(1, 'days').format('YYYY-MM-DD'),
    max: moment().format('YYYY-MM-DD')
  },
  weekToDate: {
    min: moment().subtract(7, 'days').endOf('day').format('YYYY-MM-DD'),
    max: moment().format('YYYY-MM-DD')
  },
  lastWeek: {
    min: moment().subtract(7, 'days').format('YYYY-MM-DD'),
    max: moment().format('YYYY-MM-DD')
  },
  monthToDate: {
    min: moment().subtract(1, 'months').endOf('month').format('YYYY-MM-DD'),
    max: moment().format('YYYY-MM-DD')
  },
  lastMonth: {
    min: moment().subtract(1, 'months').format('YYYY-MM-DD'),
    max: moment().format('YYYY-MM-DD')
  },
  last3Months: {
    min: moment().subtract(3, 'months').format('YYYY-MM-DD'),
    max: moment().format('YYYY-MM-DD')
  },
  last6Months: {
    min: moment().subtract(6, 'months').format('YYYY-MM-DD'),
    max: moment().format('YYYY-MM-DD')
  },
  yearToDate: {
    min: moment().subtract(1, 'years').endOf('year').format('YYYY-MM-DD'),
    max: moment().format('YYYY-MM-DD')
  },
  lastYear: {
    min: moment().subtract(1, 'years').format('YYYY-MM-DD'),
    max: moment().format('YYYY-MM-DD')
  },
  currentFinancialYear: {
    min: moment().subtract(1, 'years').endOf('year').format('YYYY-MM-DD'),
    max: moment().format('YYYY-MM-DD')
  },
  previousFinancialYear: {
    min: moment().subtract(2, 'years').endOf('year').format('YYYY-MM-DD'),
    max: moment().subtract(1, 'years').endOf('year').format('YYYY-MM-DD')
  },
  all: {
    min: undefined,
    max: undefined
  },
};

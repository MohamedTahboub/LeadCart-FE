import moment from 'moment';

const getDiffsRate = (salesList, viewsList) => salesList.map(([saleDate, saleNumber]) => {
  const sameDayExist = viewsList.find(([viewDate]) => viewDate === saleDate);
  let amount = saleNumber / 1;

  if (sameDayExist) amount = saleNumber / (isNaN(sameDayExist[1]) ? 1 : sameDayExist[1]);

  amount = Math.round(amount * 100);
  return [saleDate, amount];
});


const getDiffs = (baseList, subList) => baseList.map(([baseDate, baseValue]) => {
  const sameDayExist = subList.find(([subDate]) => subDate === baseDate);
  let amount = baseValue;

  if (sameDayExist) amount -= (isNaN(sameDayExist[1]) ? 0 : sameDayExist[1]);
  console.log('[baseDate, amount]', baseDate, amount, baseValue);
  console.log('[baseDate, amount]', [baseDate, amount]);
  return [baseDate, amount];
});


export default (feeds = [], fromDate) => {
  try {
    const activitiesSums = feeds.map(({
      activities: {
        refunds,
        views,
        sales,
        prospects
      } = {}
    }) => ({
      sums: {
        refundsAmount: getSumOf('amount').from(refunds),
        refundsNumber: getSumOf().from(refunds),
        views: getSumOf().from(views),
        prospects: getSumOf().from(prospects),
        grossRevenue: getSumOf('amount').from(sales),
        salesNumber: getSumOf().from(sales)
      },
      activities: {
        refunds, // : getListOf(['date', 'amount']).from(refunds),
        views,
        prospects, // : getListOf(['date']).from(prospects),
        sales, // getListOf(['date', 'amount']).from(sales),
      }
    }));


    const {
      sums,
      activities
    } = activitiesSums.reduce((total, product) => {
      total.sums.refundsAmount += product.sums.refundsAmount;
      total.sums.refundsNumber += product.sums.refundsNumber;
      total.sums.views += product.sums.views;
      total.sums.prospects += product.sums.prospects;
      total.sums.grossRevenue += product.sums.grossRevenue;
      total.sums.salesNumber += product.sums.salesNumber;

      total.activities.refunds = [...total.activities.refunds, ...product.activities.refunds];
      total.activities.views = [...total.activities.views, ...product.activities.views];
      total.activities.prospects = [...total.activities.prospects, ...product.activities.prospects];
      total.activities.sales = [...total.activities.sales, ...product.activities.sales];

      return total;
    },
    {
      sums: {
        refundsAmount: 0,
        refundsNumber: 0,
        views: 0,
        prospects: 0,
        grossRevenue: 0,
        salesNumber: 0
      },
      activities: {
        refunds: [],
        views: [],
        prospects: [],
        sales: []
      }
    });

    const numberOfDays = moment().diff(fromDate.min, 'days');
    sums.dailyAvg = divided(sums.grossRevenue).by(numberOfDays);
    sums.conversionRate = divided(sums.salesNumber).by(sums.views, true);
    sums.refundRate = divided(sums.refundsAmount).by(sums.grossRevenue, true);
    sums.netRevenue = sums.grossRevenue - sums.refundsAmount;
    sums.transactions = sums.salesNumber;
    sums.cartAbandonments = sums.prospects;
    sums.abandonmentsRate = divided(sums.prospects).by(sums.salesNumber, true);

    activities.refundsNumber = groupList(activities.refunds).for('date');
    activities.views = groupList(activities.views).for();
    activities.cartAbandonments = groupList(activities.prospects).for('date');
    activities.salesNumber = groupList(activities.sales).for('date');
    activities.refundsAmount = groupList(activities.refunds).for('date', 'amount');
    activities.grossRevenue = groupList(activities.sales).for('date', 'amount');

    // activities.refundRate = calcCartRefundRateList(activities.sales, activities.refunds)
    activities.conversionRate = getDiffsRate(activities.salesNumber, activities.views);
    activities.refundRate = getDiffsRate(activities.refundsNumber, activities.salesNumber);
    activities.abandonmentsRate = getDiffsRate(activities.cartAbandonments, activities.salesNumber);

    activities.netRevenue = getDiffs(activities.grossRevenue, activities.refundsAmount);

    console.log('sums.refundsAmount' , sums.refundsAmount);
    return {
      sums,
      activities
    };
  } catch (error) {
    console.log(error);
    return {
      sums: {},
      activities: {}
    };
  }
};


const getSumOf = (key) => ({
  from: (list = []) => (key
    ? +list.reduce((total, item) => {
      if (!isNaN(item[key])) return total + item[key];
      return total;
    }, 0)
    : list.length)
});

// const getListOf = (keys = []) => ({
//   from: (list = []) => list.map((item) => [...keys.map((k) => item[k])])
// });

// const getListOf = key => ({
//   groupBy : (groupKey) => ({
//     form : (list=[])=>{
//       return list.reduce((groups,item)=>{

//       },[])
//     }
//   })
// })
const divided = (amount) => ({
  by: (b, isPercent) => {
    const percents = Math.round((amount / ((b === 0 || isNaN(b)) ? 1 : b)) * 100);
    return isPercent ? percents : percents / 100;
  }
});


const groupList = (list) => ({
  for: (key, key2) => {
    const group = list.reduce((group, item) => {
      const DayDate = moment(key ? item[key] : item).format('YYYY-MM-DD');// YYYY-MM-DDTHH:mm
      if (group[DayDate]) {
        if (key2 && item[key2]) group[DayDate] += +(item[key2]);
        else group[DayDate]++;
      } else if (key2 && item[key2]) {
        group[DayDate] = +(item[key2]);
      } else {
        group[DayDate] = 1;
      }

      return group;
    }, {});


    const sortDates = (a, b) => {
      const isBefore = moment(a[0]).isBefore(b[0]);
      return isBefore ? -1 : 1;
    };

    let result = Object.entries(group).sort(sortDates);

    if (result.length === 1) {
      result.push([
        moment().subtract(1, 'weeks').format('YYYY-MM-DD'),
        0
      ]);

      result = result.reverse();
    }
    return result;
  }
});


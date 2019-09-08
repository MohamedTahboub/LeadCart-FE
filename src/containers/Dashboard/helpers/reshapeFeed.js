export default (feeds = []) => {
  const activitiesSums = feeds.map(({
    activities: {
      refunds,
      views,
      sales,
      prospects
    } = {}
  }) => ({

    sums: {
      refunds: getSumOf('amount').from(refunds),
      views: getSumOf().from(views),
      prospects: getSumOf().from(prospects),
      sales: getSumOf('amount').from(sales),
    },
    activities: {
      refunds: getListOf(['date', 'amount']).from(refunds),
      views: getListOf(['date']).from(views),
      prospects: getListOf(['date']).from(prospects),
      sales: getListOf(['date', 'amount']).from(sales),
    }
  }));


  const {
    sums,
    activities
  } = activitiesSums.reduce((total, product) => {
    total.sums.refunds += product.sums.refunds;
    total.sums.views += product.sums.views;
    total.sums.prospects += product.sums.prospects;
    total.sums.sales += product.sums.sales;

    total.activities.refunds = [...total.activities.refunds, ...product.activities.refunds];
    total.activities.views = [...total.activities.views, ...product.activities.views];
    total.activities.prospects = [...total.activities.prospects, ...product.activities.prospects];
    total.activities.sales = [...total.activities.sales, ...product.activities.sales];

    return total;
  },
  {
    sums: {
      refunds: 0,
      views: 0,
      prospects: 0,
      sales: 0
    },
    activities: {
      refunds: [],
      views: [],
      prospects: [],
      sales: []
    }
  });

  return {
    sums,
    activities
  };
};


const getSumOf = (key) => ({
  from: (list = []) => (key
    ? +list.reduce((total, item) => {
      if (!isNaN(item[key])) return total + item[key];
      return total;
    }, 0)
    : list.length)
});

const getListOf = (keys) => ({
  from: (list) => list.map((item) => [...keys.map((k) => item[k])])
});

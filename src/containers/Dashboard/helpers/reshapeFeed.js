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
    activities: {}
  }));


  const {
    sums,
    activities
  } = activitiesSums.reduce((total, product) => {
    total.sums.refunds += product.sums.refunds;
    total.sums.views += product.sums.views;
    total.sums.prospects += product.sums.prospects;
    total.sums.sales += product.sums.sales;

    return total;
  },
  {
    sums: {
      refunds: 0,
      views: 0,
      prospects: 0,
      sales: 0
    },
    activities: {}
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

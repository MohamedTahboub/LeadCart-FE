import moment from 'moment';

const faker = require('faker');

const generateProductActivities = (repeats = 4) => {
  const getRandom = () => Math.round(Math.random(10));

  const repeat = (object, type = 'list') => {
    const times = (times = 1) => {
      const list = [];
      for (let i = 1; i <= times; i += 1) {
        if (typeof object === 'function') list.push(object());
        else list.push(object);
      }
      return list;
    };
    return {
      for: times
    };
  };


  const ActivitySchema = () => ({
    productId: faker.random.uuid(),
    productName: faker.commerce.productName(),
    owner: faker.random.uuid(),
    activities: {
      refunds: repeat(() => (
        {
          date: faker.date.past(),
          amount: faker.finance.amount()
        })).for(1000),
      prospects: repeat(() => (
        {
          date: faker.date.past(),
          email: faker.internet.email()
        })).for(getRandom()),
      views: repeat(() => (

        {
          date: faker.date.past(),
          agent: faker.internet.userAgent(),
          ip: faker.internet.ip()
        }
      )).for(getRandom()),
      sales: repeat(() => (
        {
          date: faker.date.past(),
          amount: faker.finance.amount()
        })).for(500)
    }
  });

  return repeat(ActivitySchema).for(repeats);
};


export default generateProductActivities();


export const getChartsFeed = (filters, meta) => {
  setTimeout(() => {
    if (meta.onSuccess) meta.onSuccess(generateProductActivities(1));
  }, 200);
};


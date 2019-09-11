import moment from 'moment';

const faker = require('faker');

const generateProductActivities = (repeats = 4) => {
  const getRandom = () => Math.round(Math.random(10));

  const repeat = (object, type = 'list') => {
    const times = (times = 1) => {
      const list = [];
      for (let i = 1; i <= times; i += 1) {
        if (typeof object === 'function') list.push(object(i));
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
      refunds: repeat((i) => (
        {
          date: moment(faker.date.past(i)).format('L'),
          amount: faker.random.number(10)
        })).for(10),
      prospects: repeat((i) => (
        {
          date: moment(faker.date.past(i)).format('L'),
          email: faker.internet.email()
        })).for(getRandom()),
      views: repeat((i) => (

        {
          date: moment(faker.date.past(i)).format('L'),
          agent: faker.internet.userAgent(),
          ip: faker.internet.ip()
        }
      )).for(getRandom(20)),
      sales: repeat((i) => (
        {
          date: moment(faker.date.past(i)).format('L'),
          amount: faker.random.number(100)
        })).for(5)
    }
  });

  return repeat(ActivitySchema).for(repeats);
};


export default generateProductActivities();


export const getChartsFeed = (filters, meta) => {
  setTimeout(() => {
    if (meta.onSuccess) meta.onSuccess(generateProductActivities(10));
  }, 200);
};


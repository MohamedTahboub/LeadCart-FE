import ids from 'shortid';

export const filterSubscriptions = (orders = []) => orders.filter(({ payment }) => payment.paymentType === 'Subscription');


export const filteringActivities = (orders) => ({
  orders,
  subscriptions: filterSubscriptions(orders)
});


export const filterCustomers = (orders = []) => {
  const customers = {};
  orders.map(({ customer, ...order }) => {
    if (!customers[customer.email]) customers[customer.email] = { ...customer, orders: [order] };
    else customers[customer.email].orders.push(order);
  });

  return Object
    .keys(customers)
    .map((key) => customers[key])
    .map((customer) => ({
      lifeTimeCharges: customer.orders.reduce((total, o) => total + o.totalCharge, 0),
      ...customer
    }));
};

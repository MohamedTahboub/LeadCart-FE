import ids from 'shortid';

export const filterSubscriptions = (orders = []) => orders.filter(({ payment }) => payment.paymentType === 'Subscription');


export const filteringActivities = (orders) => ({
  orders: orders.sort(sortOrders),
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
      lifeTimeCharges: customer.orders.reduce((total, o) => {
        if (o.payment.paymentRefunded || o.payment.subscriptionCanceled) total -= o.product.price.amount;


        if (o.offerPaymentRefunded) total -= o.product.offer.price;


        total += o.totalCharge;
        return total;
      }, 0),
      ...customer
    }))
    .sort(sortCustomers);
};

function sortCustomers (customer1, customer2) {
  return customer1.orders[customer1.orders.length - 1].createdAt - customer2.orders[customer2.orders.length - 1].createdAt;
}

function sortOrders (o1, o2) {
  return (new Date(o2.createdAt) - new Date(o1.createdAt));
}


export const RoundTow = (number) => Math.round(number * 100) / 100;

import ids from 'shortid'

export const filterSubscriptions = (orders = []) =>
  orders.filter(({ payment }) => payment.paymentType === 'Subscription')


export const filteringActivities = (orders) => ({
  orders,
  subscriptions: filterSubscriptions(orders)
});



export const filterCustomers = (orders = [], products = []) => {
  const customers = {}
  orders.map(({ customer, ...order }) => {
    if (!customers[customer.email])
      customers[customer.email] = { ...customer, orders: [order] }
    else
      customers[customer.email].orders.push(order)
  });

  console.log(products)
  return Object
    .keys(customers)
    .map(key => customers[key])
    .map(({ orders, ...customer }) => ({
      ...customer,
      orders: orders.map(o => ({
        ...o,
        orderCode: ids.generate().toUpperCase(),
        coupon: {
          code: 'E3XSwRt',
          discount: 21
        },
        product: {
          id: o.product,
          name: 'Product V',
          price: 120,
          offer: {
            name: 'This year top selling book',
            price: 30
          }
        }
      })),
      lifeTimeCharges: orders.reduce((total, { price }) => {
        total += price.amount
        return total
      }, 0)
    }))
}

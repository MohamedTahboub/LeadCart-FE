

export const filteringActivities = (customers) => {
  console.log(JSON.stringify(customers[2], null, 2));
  return {
    customers: customers.map(({
      _id: id, email, firstName, lastName, phoneNumber, products
    }) => ({
      id,
      email,
      firstName,
      lastName,
      phoneNumber,
      lifeTimeCharge: products.reduce((total, { price: { amount = 0 } = {} }) => {
        total += amount; return total;
      }, 0)
    })),
    orders: customers.reduce((orders, customers) => {
      const { products, ...c } = customers;

      return [...orders, ...products.map(({
        name: productName,
        payment: { type: paymentType, methods: paymentMethod },
        price: { amount: price },
        ...p
      }) => ({
        ...p,
        productName,
        paymentType,
        paymentMethod,
        price,
        ...c
      }))];
    }, []),
    subscriptions: customers.reduce((subscriptions, customer) => {
      const subScriptedTo = customer.products.filter(({ payment: { type } }) => type === 'Onetime');
      delete customer.products;
      if (subScriptedTo.length) return [...subscriptions, { ...customer, subScriptedTo }];
      return subscriptions;
    }, [])
  };
};


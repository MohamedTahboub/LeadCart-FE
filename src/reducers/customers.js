import {
  GET_CUSTOMERS,
  ORDER_REFUND_SUCCESS
} from '../constantsTypes';

const initState = { list: [] };
export default (state = initState, { type, payload }) => {
  switch (type) {
  case GET_CUSTOMERS:
    return {
      ...state,
      list: payload
    };
  case ORDER_REFUND_SUCCESS: {
    const oldOrders = payload.orders;
    const orders = oldOrders.map((order) => {
      if (order._id === payload.orderId) {
        let totalCharge = 0;
        // Go through order.products to update the refunded product
        const products = order.products.map((product) => {
          if (payload.productId !== product.id) {
            totalCharge += product.price;
            return product;
          }
          let price = product.price;
          if (payload.target === 'offer') {
            // Go through order.product.offers to update the refunded product's offer
            const offers = product.offers.map((offer) => {
              if (offer.id === payload.productId) {
                price -= offer.price;
                totalCharge += price;
                return { ...offer, refunded: true, price: -offer.price };
              }
              return offer;
            });
            totalCharge += price;
            return { ...product, offers, price };
          } else if (payload.target === 'product') {
            return {
              ...product,
              payment: { ...product.payment, paymentRefunded: true },
              price: 0
            };
          }
          return product;
        });
        return { ...order, products, totalCharge };
      }
      return order;
    });
    return {
      ...state,
      list: state.list.map((customer) => {
        const refundedOrder = customer.orders.find((order) => order === payload.orderId);
        if (refundedOrder) {
          const lifeTimeCharges = orders.reduce((lifeTimeCharges, order) => {
            if (order.customer.email === customer.email)
              return lifeTimeCharges + order.totalCharge;
            return lifeTimeCharges;
          }, 0).toString();
          return { ...customer, lifeTimeCharges };
        }
        return customer;
      })
    };
  }
  default: return state;
  }
};

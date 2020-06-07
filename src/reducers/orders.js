import {
  GET_ORDERS,
  ORDER_REFUND_SUCCESS
} from '../constantsTypes';


const initState = [];

export default (state = initState, { type, payload }) => {
  switch (type) {
  case GET_ORDERS:
    return payload;

  case ORDER_REFUND_SUCCESS: {
    const orders = state.map((order) => {
      if (order._id === payload.orderId) {
        const products = order.products.map((product) => {
          if (product.id === payload.productId) {
            if (payload.target !== 'offer') product.price.amount *= -1;
            else product.offer.price *= -1;
          }
          return { ...product };
        });
        return { ...order, products };
      }
      return order;
    });

    return orders;
  }
  default: return state;
  }
};

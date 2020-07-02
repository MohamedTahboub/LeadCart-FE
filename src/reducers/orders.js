import {
  GET_ORDERS,
  ORDER_REFUND_SUCCESS,
  REFUND_PRODUCT
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
          // if (product.id === payload.productId) {
          //   if (payload.target !== 'offer') product.price.amount *= -1;
          //   else product.offer.price *= -1;
          // }
          return { ...product };
        });
        return { ...order, products };
      }
      return order;
    });

    return orders;
  }

  case REFUND_PRODUCT:
    // eslint-disable-next-line no-case-declarations
    const updatedOrders = state.map((order) => {
      if (order._id === payload.orderId) {
        const updatedProducts = order.products.map((product) => {
          if (product.id === payload.productId) return { ...product, price: 0, coupon: undefined, payment: { ...product.payment, paymentRefunded: true } };
          return product;
        });
        return {
          ...order,
          products: updatedProducts,
          totalCharge: updatedProducts.reduce((totalCharge, product) => {
            if (product.coupon) return totalCharge + (product.price - product.coupon.discount);
            return totalCharge + product.price;
          }, 0)
        };
      }
      return order;
    });
    return [...updatedOrders];
  default: return state;
  }
};

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
    // Go through orders to update the refunded order
    const orders = state.map((order) => {
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
    return orders;
  }

  default: return state;
  }
};

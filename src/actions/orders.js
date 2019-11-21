import {
  GET_ORDERS
} from 'constantsTypes';



export const getOrders = (orders) => ({
  type: GET_ORDERS,
  payload: orders
});


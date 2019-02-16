import {
  GET_CUSTOMERS_LIST,
  GET_ORDERS_LIST,
  GET_SUBSCRIPTIONS_LIST,
  GET_CUSTOMERS_ACTIVITIES
} from 'constantsTypes';

export const getCustomersActivities = (activities) => ({
  type: GET_CUSTOMERS_ACTIVITIES,
  payload: activities
});
export const getCustomerList = (customers) => ({
  type: GET_CUSTOMERS_LIST,
  payload: customers
});

export const getOrdersList = (orders) => ({
  type: GET_ORDERS_LIST,
  payload: orders
});

export const getSubscriptionsList = (subscriptions) => ({
  type: GET_SUBSCRIPTIONS_LIST,
  payload: subscriptions
});

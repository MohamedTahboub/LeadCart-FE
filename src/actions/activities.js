import {
  GET_CUSTOMERS,
  GET_ACTIVITIES
} from 'constantsTypes';

// getActivities
// getCustomers

export const getActivities = (activities) => ({
  type: GET_ACTIVITIES,
  payload: activities
});
export const getCustomers = (customers) => ({
  type: GET_CUSTOMERS,
  payload: customers
});

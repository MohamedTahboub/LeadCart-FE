import {
  GET_DASHBOARD_DATA,
  GET_DASHBOARD_DATA_SUCCESS,
  GET_DASHBOARD_DATA_FAILED,
} from '../constantsTypes';


export const getDashboardData = (filters, meta) => ({
  type: GET_DASHBOARD_DATA,
  payload: filters,
  meta
});
export const getDashboardDataSuccess = (data) => ({
  type: GET_DASHBOARD_DATA_SUCCESS,
  payload: data
});
export const getDashboardDataFailed = (message) => ({
  type: GET_DASHBOARD_DATA_FAILED,
  payload: message
});

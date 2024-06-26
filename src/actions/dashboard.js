import {
  GET_DASHBOARD_CHARTS_DATA,
  GET_DASHBOARD_CHARTS_DATA_FAILED,
  GET_DASHBOARD_CHARTS_DATA_SUCCESS,
  GET_DASHBOARD_DATA,
  GET_DASHBOARD_DATA_FAILED,
  GET_DASHBOARD_DATA_SUCCESS,
  RESET_DASHBOARD_ACTIVITIES,
  RESET_DASHBOARD_ACTIVITIES_FAILED,
  RESET_DASHBOARD_ACTIVITIES_SUCCESS,
  UPDATE_DASHBOARD_CHARTS_SETTINGS,
  UPDATE_DASHBOARD_CHARTS_SETTINGS_FAILED,
  UPDATE_DASHBOARD_CHARTS_SETTINGS_SUCCESS
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

export const getDashboardChartsData = (filters, meta) => ({
  type: GET_DASHBOARD_CHARTS_DATA,
  payload: filters,
  meta
});
export const getDashboardChartsDataSuccess = (data) => ({
  type: GET_DASHBOARD_CHARTS_DATA_SUCCESS,
  payload: data
});
export const getDashboardChartsDataFailed = (message) => ({
  type: GET_DASHBOARD_CHARTS_DATA_FAILED,
  payload: message
});

export const updateDashboardChartsSettings = (filters, meta) => ({
  type: UPDATE_DASHBOARD_CHARTS_SETTINGS,
  payload: filters,
  meta
});
export const updateDashboardChartsSettingsSuccess = (data) => ({
  type: UPDATE_DASHBOARD_CHARTS_SETTINGS_SUCCESS,
  payload: data
});
export const updateDashboardChartsSettingsFailed = (message) => ({
  type: UPDATE_DASHBOARD_CHARTS_SETTINGS_FAILED,
  payload: message
});

export const resetDashboardActivities = (filters, meta) => ({
  type: RESET_DASHBOARD_ACTIVITIES,
  payload: filters,
  meta
});
export const resetDashboardActivitiesSuccess = (data) => ({
  type: RESET_DASHBOARD_ACTIVITIES_SUCCESS,
  payload: data
});
export const resetDashboardActivitiesFailed = (message) => ({
  type: RESET_DASHBOARD_ACTIVITIES_FAILED,
  payload: message
});


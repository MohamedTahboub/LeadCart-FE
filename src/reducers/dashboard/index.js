import {
  GET_DASHBOARD_DATA_SUCCESS,
  GET_DASHBOARD_CHARTS_DATA_SUCCESS,
  UPDATE_DASHBOARD_CHARTS_SETTINGS_SUCCESS
} from '../../constantsTypes';

const initialState = {
  activities: [],
  // settings: {}
};


export default (state = initialState, { type, payload }) => {
  switch (type) {
  case GET_DASHBOARD_DATA_SUCCESS:
    return {
      ...state,
      ...payload
    };
  case GET_DASHBOARD_CHARTS_DATA_SUCCESS:
    return {
      ...state,
      activities: payload
    };
  case UPDATE_DASHBOARD_CHARTS_SETTINGS_SUCCESS:
    return {
      ...state,
      settings: payload.dashboardSettings
    };
  default: return state;
  }
};

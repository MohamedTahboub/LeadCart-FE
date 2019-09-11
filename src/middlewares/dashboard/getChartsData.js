import { apiRequest } from 'actions/apiRequest';
import { GET_DASHBOARD_CHARTS_DATA } from '../../constantsTypes';
import {
  getDashboardChartsDataFailed,
  getDashboardChartsDataSuccess
} from '../../actions/dashboard';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== GET_DASHBOARD_CHARTS_DATA) return next(action);

  const { payload, meta = {} } = action;


  dispatch(apiRequest({
    options: {
      method: 'GET',
      uri: '/api/product-activity',
      body: payload,
      contentType: 'json',
    },
    onSuccess: (arg) => {
      if (meta.onSuccess) meta.onSuccess(arg);
      return getDashboardChartsDataFailed(arg);
    },
    onFailed: (message) => {
      if (meta.onFailed) meta.onFailed(message);
      return getDashboardChartsDataSuccess(message);
    }
  }));
};

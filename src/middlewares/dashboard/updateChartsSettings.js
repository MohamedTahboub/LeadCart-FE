import { apiRequest } from 'actions/apiRequest';
import { UPDATE_DASHBOARD_CHARTS_SETTINGS } from '../../constantsTypes';
import {
  updateDashboardChartsSettingsFailed,
  updateDashboardChartsSettingsSuccess
} from '../../actions/dashboard';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== UPDATE_DASHBOARD_CHARTS_SETTINGS) return next(action);

  const { payload, meta = {} } = action;


  dispatch(apiRequest({
    options: {
      method: 'PUT',
      uri: '/api/brands/dashboard',
      body: payload,
      contentType: 'json'
    },
    onSuccess: (arg) => {
      if (meta.onSuccess) meta.onSuccess(arg);
      return updateDashboardChartsSettingsSuccess(payload);
    },
    onFailed: (message) => {
      if (meta.onFailed) meta.onFailed(message);
      return updateDashboardChartsSettingsFailed(message);
    }
  }));
};

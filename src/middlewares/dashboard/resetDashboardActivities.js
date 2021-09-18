import { apiRequest } from 'actions/apiRequest';
import { RESET_DASHBOARD_ACTIVITIES } from '../../constantsTypes';
import {
  resetDashboardActivitiesFailed,
  resetDashboardActivitiesSuccess
} from '../../actions/dashboard';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== RESET_DASHBOARD_ACTIVITIES) return next(action);

  const { payload, meta = {} } = action;


  dispatch(apiRequest({
    options: {
      method: 'DELETE',
      uri: '/api/brands/product-activity/clear',
      body: payload,
      contentType: 'json'
    },
    onSuccess: (arg) => {
      if (meta.onSuccess) meta.onSuccess(arg);
      return resetDashboardActivitiesSuccess(payload);
    },
    onFailed: (message) => {
      if (meta.onFailed) meta.onFailed(message);
      return resetDashboardActivitiesFailed(message);
    }
  }));
};


import { deleteFunnelSuccess, deleteFunnelFailed } from 'actions/funnels';
import { apiRequest } from 'actions/apiRequest';
import { DELETE_FUNNEL } from '../../constantsTypes';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== DELETE_FUNNEL) return next(action);

  const { payload, meta = {} } = action;

  dispatch(apiRequest({
    options: {
      method: 'DELETE',
      body: payload,
      uri: '/api/funnels',
      contentType: 'json'
    },
    onSuccess: (args) => {
      if (meta.onSuccess) meta.onSuccess(args);
      return deleteFunnelSuccess(payload);
    },
    onFailed: (message) => {
      if (meta.onFailed) meta.onFailed(message);

      return deleteFunnelFailed(message);
    }
  }));
};

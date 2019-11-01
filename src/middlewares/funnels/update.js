
import { updateFunnelSuccess, updateFunnelFailed } from 'actions/funnels';
import { apiRequest } from 'actions/apiRequest';
import { UPDATE_FUNNEL } from '../../constantsTypes';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== UPDATE_FUNNEL) return next(action);

  const { payload, meta = {} } = action;

  dispatch(apiRequest({
    options: {
      method: 'update',
      body: payload,
      uri: '/api/funnel',
      contentType: 'json'
    },
    onSuccess: (args) => {
      if (meta.onSuccess) meta.onSuccess(args);
      return updateFunnelSuccess(args);
    },
    onFailed: (message) => {
      if (meta.onFailed) meta.onFailed(message);

      return updateFunnelFailed(message);
    }
  }));
};

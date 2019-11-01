
import { createFunnelSuccess, createFunnelFailed } from 'actions/funnels';
import { apiRequest } from 'actions/apiRequest';
import { CREATE_FUNNEL } from '../../constantsTypes';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== CREATE_FUNNEL) return next(action);

  const { payload, meta = {} } = action;

  dispatch(apiRequest({
    options: {
      method: 'post',
      body: payload,
      uri: '/api/funnel',
      contentType: 'json'
    },
    onSuccess: (args) => {
      if (meta.onSuccess) meta.onSuccess(args);
      return createFunnelSuccess(args);
    },
    onFailed: (message) => {
      if (meta.onFailed) meta.onFailed(message);

      return createFunnelFailed(message);
    }
  }));
};

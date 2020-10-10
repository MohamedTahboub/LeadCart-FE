
import {
  connectIntegrationServiceFailed,
  connectIntegrationServiceSuccess
} from '../../actions/integrations';
import { apiRequest } from '../../actions/apiRequest';
import { CONNECT_INTEGRATION_SERVICE } from '../../constantsTypes';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== CONNECT_INTEGRATION_SERVICE) return next(action);

  const { payload, meta = {} } = action;

  dispatch(apiRequest({
    options: {
      method: 'post',
      body: payload,
      uri: '/api/brands/integrations',
      contentType: 'json'
    },
    onSuccess: (args) => {
      if (meta.onSuccess) meta.onSuccess(args);
      return connectIntegrationServiceSuccess(payload);
    },
    onFailed: (message) => {
      if (meta.onFailed) meta.onFailed(message);

      return connectIntegrationServiceFailed(message);
    }
  }));
};

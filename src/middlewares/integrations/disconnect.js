
import {
  disconnectIntegrationServiceSuccess,
  disconnectIntegrationServiceFailed,
} from '../../actions/integrations';
import { apiRequest } from '../../actions/apiRequest';
import { DISCONNECT_INTEGRATION_SERVICE } from '../../constantsTypes';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== DISCONNECT_INTEGRATION_SERVICE) return next(action);

  const { payload, meta = {} } = action;

  dispatch(apiRequest({
    options: {
      method: 'POST',
      body: payload,
      uri: '/api/brands/integrations/disconnect',
      contentType: 'json'
    },
    onSuccess: (args) => {
      if (meta.onSuccess) meta.onSuccess(args);
      return disconnectIntegrationServiceSuccess(payload);
    },
    onFailed: (message) => {
      if (meta.onFailed) meta.onFailed(message);

      return disconnectIntegrationServiceFailed(message);
    }
  }));
};

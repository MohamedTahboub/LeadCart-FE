
import {
  checkIntegrationServiceSuccess,
  checkIntegrationServiceFailed
} from 'actions/integrations';

import { apiRequest } from '../../actions/apiRequest';
import { CHECK_INTEGRATION_SUPPORT } from '../../constantsTypes';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== CHECK_INTEGRATION_SUPPORT) return next(action);

  const { payload, meta = {} } = action;

  dispatch(apiRequest({
    options: {
      method: 'post',
      body: payload,
      uri: '/api/brands/integrations/support',
      contentType: 'json'
    },
    onSuccess: (args) => {
      if (meta.onSuccess) meta.onSuccess(args);
      return checkIntegrationServiceSuccess(args);
    },
    onFailed: (message) => {
      if (meta.onFailed) meta.onFailed(message);

      return checkIntegrationServiceFailed(message);
    }
  }));
};

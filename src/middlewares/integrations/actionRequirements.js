
import {
  getIntegrationActionRequirementSuccess,
  getIntegrationActionRequirementFailed,
} from '../../actions/integrations';
import { apiRequest } from '../../actions/apiRequest';
import { GET_INTEGRATION_ACTION_REQUIREMENT } from '../../constantsTypes';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== GET_INTEGRATION_ACTION_REQUIREMENT) return next(action);

  const { payload, meta = {} } = action;

  dispatch(apiRequest({
    options: {
      method: 'post',
      body: payload,
      uri: '/api/integrations/requirements',
      contentType: 'json'
    },
    onSuccess: (args) => {
      if (meta.onSuccess) meta.onSuccess(args);
      return getIntegrationActionRequirementSuccess(args);
    },
    onFailed: (message) => {
      if (meta.onFailed) meta.onFailed(message);

      return getIntegrationActionRequirementFailed(message);
    }
  }));
};

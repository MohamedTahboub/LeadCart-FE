import {
  updateIntegratedServiceSettingsFailed,
  updateIntegratedServiceSettingsSuccess
} from '../../actions/integrations';
import { apiRequest } from '../../actions/apiRequest';
import { UPDATE_INTEGRATED_SERVICE_SETTINGS } from '../../constantsTypes';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== UPDATE_INTEGRATED_SERVICE_SETTINGS) return next(action);

  const { payload, meta = {} } = action;

  dispatch(apiRequest({
    options: {
      method: 'PUT',
      body: payload,
      uri: '/api/brands/integrations/settings',
      contentType: 'json'
    },
    onSuccess: (args) => {
      if (meta.onSuccess) meta.onSuccess(args);
      return updateIntegratedServiceSettingsSuccess(payload);
    },
    onFailed: (message) => {
      if (meta.onFailed) meta.onFailed(message);
      return updateIntegratedServiceSettingsFailed(message);
    }
  }));
};



import {
  updateActiveBrandSuccess,
  updateActiveBrandFailed,
} from '../../actions/brands';
import { apiRequest } from '../../actions/apiRequest';
import { UPDATE_ACTIVE_BRAND } from '../../constantsTypes';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== UPDATE_ACTIVE_BRAND) return next(action);

  const { payload, meta = {} } = action;

  dispatch(apiRequest({
    options: {
      method: 'POST',
      body: payload,
      uri: '/api/brands/active-brand',
      contentType: 'json'
    },
    onSuccess: (args) => {
      if (meta.onSuccess) meta.onSuccess(args);
      return updateActiveBrandSuccess(payload);
    },
    onFailed: (message) => {
      if (meta.onFailed) meta.onFailed(message);

      return updateActiveBrandFailed(message);
    }
  }));
};

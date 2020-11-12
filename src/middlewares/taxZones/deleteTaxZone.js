import { DELETE_TAX_ZONE } from 'constantsTypes';
import { deleteTaxZoneFailed, deleteTaxZoneSuccess } from 'actions/taxZones';
import { apiRequest } from 'actions/apiRequest';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== DELETE_TAX_ZONE) return next(action);
  const { payload, meta = {} } = action;

  dispatch(apiRequest({
    options: {
      method: 'DELETE',
      uri: '/api/brands/tax-zones',
      body: payload,
      contentType: 'json'
    },
    onSuccess: (args) => {
      if (meta.onSuccess) meta.onSuccess(args);
      return deleteTaxZoneSuccess(payload);
    },
    onFailed:  (message) => {
      if (meta.onFailed) meta.onFailed(message);
      return deleteTaxZoneFailed(message);
    }
  }));
};


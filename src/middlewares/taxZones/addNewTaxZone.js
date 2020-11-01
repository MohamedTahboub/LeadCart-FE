import { ADD_NEW_TAX_ZONE } from 'constantsTypes';
import { addNewTaxZoneFailed, addNewTaxZoneSuccess } from 'actions/taxZones';
import { apiRequest } from 'actions/apiRequest';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== ADD_NEW_TAX_ZONE) return next(action);
  const { payload, meta = {} } = action;

  dispatch(apiRequest({
    options: {
      method: 'POST',
      uri: '/api/brands/tax-zones',
      body: payload,
      contentType: 'json'
    },
    onSuccess: (args) => {
      if (meta.onSuccess) meta.onSuccess(args);
      return addNewTaxZoneSuccess(args);
    },
    onFailed:  (message) => {
      if (meta.onFailed) meta.onFailed(message);
      return addNewTaxZoneFailed(message);
    }
  }));
};


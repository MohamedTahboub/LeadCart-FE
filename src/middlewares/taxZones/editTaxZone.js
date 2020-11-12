import { EDIT_TAX_ZONE } from 'constantsTypes';
import { editTaxZoneFailed, editTaxZoneSuccess } from 'actions/taxZones';
import { apiRequest } from 'actions/apiRequest';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== EDIT_TAX_ZONE) return next(action);
  const { payload, meta = {} } = action;

  dispatch(apiRequest({
    options: {
      method: 'PUT',
      uri: '/api/brands/tax-zones',
      body: payload,
      contentType: 'json'
    },
    onSuccess: (args) => {
      if (meta.onSuccess) meta.onSuccess(args);
      return editTaxZoneSuccess(payload);
    },
    onFailed:  (message) => {
      if (meta.onFailed) meta.onFailed(message);
      return editTaxZoneFailed(message);
    }
  }));
};


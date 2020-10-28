import { DELETE_TAX } from 'constantsTypes';
import { deleteTaxFailed, deleteTaxSuccess } from 'actions/taxes';
import { apiRequest } from 'actions/apiRequest';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== DELETE_TAX) return next(action);
  const { payload, meta = {} } = action;

  dispatch(apiRequest({
    options: {
      method: 'DELETE',
      uri: '/api/brands/taxes',
      body: payload,
      contentType: 'json'
    },
    onSuccess: (args) => {
      if (meta.onSuccess) meta.onSuccess(args);
      return deleteTaxSuccess(payload);
    },
    onFailed:  (message) => {
      if (meta.onFailed) meta.onFailed(message);
      return deleteTaxSuccess(payload);
    }
  }));
};


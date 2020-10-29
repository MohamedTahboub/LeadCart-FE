import { ADD_NEW_TAX } from 'constantsTypes';
import { addNewTaxFailed, addNewTaxSuccess } from 'actions/taxes';
import { apiRequest } from 'actions/apiRequest';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== ADD_NEW_TAX) return next(action);
  const { payload, meta = {} } = action;

  dispatch(apiRequest({
    options: {
      method: 'POST',
      uri: '/api/brands/taxes',
      body: payload,
      contentType: 'json'
    },
    onSuccess: (args) => {
      if (meta.onSuccess) meta.onSuccess(args);
      return addNewTaxSuccess(args);
    },
    onFailed:  (message) => {
      if (meta.onFailed) meta.onFailed(message);
      return addNewTaxFailed(message);
    }
  }));
};


import { CREATE_SUB_ACCOUNT } from 'constantsTypes';
import { onCreateSubAccountSuccess, onCreateSubAccountFailed } from 'actions/agency';
import { apiRequest } from 'actions/apiRequest';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== CREATE_SUB_ACCOUNT) return next(action);

  const { payload, meta = {} } = action;
  dispatch(apiRequest({
    options: {
      method: 'POST',
      body: action.payload,
      uri: '/api/users/agents/',
      contentType: 'json'
    },
    onSuccess: (args) => {
      if (meta.onSuccess) meta.onSuccess(args);
      return onCreateSubAccountSuccess(payload);
    },
    onFailed: (message) => {
      if (meta.onFailed) meta.onFailed(message);
      return onCreateSubAccountFailed(message);
    }
  }));
};


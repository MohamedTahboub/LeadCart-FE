import { REQUEST_SUB_ACCOUNT_DELETION } from '../../constantsTypes';
import { requestSubAccountDeletionFailed, requestSubAccountDeletionSuccess } from '../../actions/agency';
import { apiRequest } from 'actions/apiRequest';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== REQUEST_SUB_ACCOUNT_DELETION) return next(action);

  const { payload, meta = {} } = action;
  dispatch(apiRequest({
    options: {
      method: 'PUT',
      body: payload,
      uri: '/api/users/agents/archive',
      contentType: 'json'
    },
    onSuccess: (args) => {
      if (meta.onSuccess)
        meta.onSuccess(args);
      return requestSubAccountDeletionSuccess(payload);
    },
    onFailed: (message) => {
      if (meta.onFailed)
        meta.onFailed(message);
      return requestSubAccountDeletionFailed(message);
    }
  }));
};


import { UPDATE_ACCOUNT_EMAIL } from 'constantsTypes';
import { apiRequest } from 'actions/apiRequest';

import {
  updateAccountEmailFailed,
  updateAccountEmailSuccess
} from 'actions/account';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== UPDATE_ACCOUNT_EMAIL) return next(action);

  const { payload, meta = {} } = action;
  dispatch(apiRequest({
    options: {
      method: 'PUT',
      body: payload,
      uri: '/api/users/settings/email',
      contentType: 'json'
    },
    onSuccess: (arg) => {
      if (meta.onSuccess) meta.onSuccess(arg);
      return updateAccountEmailSuccess(payload);
    },
    onFailed: (arg) => {
      if (meta.onFailed) meta.onFailed(arg);
      return updateAccountEmailFailed(arg);
    }
  }));
};

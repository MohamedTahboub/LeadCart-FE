import { VERIFY_RESET_KEY } from 'constantsTypes';
import { apiRequest } from 'actions/apiRequest';
import {
  verifyResetKeySuccess,
  verifyResetKeyFailed
} from 'actions/account';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== VERIFY_RESET_KEY) return next(action);

  const { payload, meta = {} } = action;
  dispatch(apiRequest({
    options: {
      method: 'POST',
      body: payload,
      uri: '/api/users/password/reset',
      contentType: 'json'
    },
    onSuccess: (arg) => {
      if (meta.onSuccess) meta.onSuccess(arg);
      return verifyResetKeySuccess(arg);
    },
    onFailed: (arg) => {
      if (meta.onFailed) meta.onFailed(arg);
      return verifyResetKeyFailed(arg);
    }

  }));
};

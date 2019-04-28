import { RESET_PASSWORD } from 'constantsTypes';
import { apiRequest } from 'actions/apiRequest';
import {
  resetPasswordSuccess,
  resetPasswordFailed
} from 'actions/account';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== RESET_PASSWORD) return next(action);

  const { payload, meta = {} } = action;
  dispatch(apiRequest({
    options: {
      method: 'PUT',
      body: payload,
      uri: '/api/users/password/reset',
      contentType: 'json'
    },
    onSuccess: (arg) => {
      if (meta.onSuccess) meta.onSuccess(arg);
      return resetPasswordSuccess(arg);
    },
    onFailed: (arg) => {
      if (meta.onFailed) meta.onFailed(arg);
      return resetPasswordFailed(arg);
    }

  }));
};

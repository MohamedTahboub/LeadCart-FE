import { FORGOT_PASSWORD } from 'constantsTypes';
import { apiRequest } from 'actions/apiRequest';
import {
  forgotPasswordSuccess,
  forgotPasswordFailed
} from 'actions/account';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== FORGOT_PASSWORD) return next(action);

  const { payload, meta = {} } = action;
  dispatch(apiRequest({
    options: {
      method: 'POST',
      body: payload,
      uri: '/api/users/password/forgot',
      contentType: 'json'
    },
    onSuccess: (arg) => {
      if (meta.onSuccess) meta.onSuccess(arg);
      return forgotPasswordSuccess(arg);
    },
    onFailed: (arg) => {
      if (meta.onFailed) meta.onFailed(arg);
      return forgotPasswordFailed(arg);
    }

  }));
};

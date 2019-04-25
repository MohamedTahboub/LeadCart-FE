import { VERIFY_USER_ACCOUNT } from 'constantsTypes';
import { apiRequest } from 'actions/apiRequest';
import {
  verifyUserAccountSuccess,
  verifyUserAccountFailed
} from 'actions/account';

import {
  loginSuccess,
  loginFailed
} from 'actions/login';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== VERIFY_USER_ACCOUNT) return next(action);

  const { payload, meta = {} } = action;
  dispatch(apiRequest({
    options: {
      method: 'POST',
      body: payload,
      uri: '/api/users/verify',
      contentType: 'json'
    },
    onSuccess: (arg) => {
      if (meta.onSuccess) meta.onSuccess(arg);
      return verifyUserAccountSuccess(arg);
    },
    onFailed: (arg) => {
      if (meta.onFailed) meta.onFailed(arg);
      return verifyUserAccountFailed(arg);
    }

  }));
  // .then(({ success, message, data }) => (success
  //   ? dispatch(loginSuccess(data))
  //   : dispatch(loginFailed(message))))
  // .catch((err) => dispatch(loginFailed('Something gone wrong,please try again later ')));
};

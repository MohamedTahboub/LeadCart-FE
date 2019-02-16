import { LOGIN } from 'constantsTypes';
import { apiRequest } from 'actions/apiRequest';

import {
  loginSuccess,
  loginFailed
} from 'actions/login';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== LOGIN) return next(action);

  dispatch(apiRequest({
    options: {
      method: 'POST',
      body: action.payload,
      uri: '/api/users/login',
      contentType: 'json'
    },
    onSuccess: loginSuccess,
    onFailed: loginFailed
  }));
  // .then(({ success, message, data }) => (success
  //   ? dispatch(loginSuccess(data))
  //   : dispatch(loginFailed(message))))
  // .catch((err) => dispatch(loginFailed('Something gone wrong,please try again later ')));
};

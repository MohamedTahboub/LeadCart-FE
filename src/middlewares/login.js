import { LOGIN } from 'constantsTypes';
import { apiRequest } from 'actions/apiRequest';

import {
  loginSuccess,
  loginFaild
} from 'actions/login';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== LOGIN) return next(action);

  dispatch(apiRequest({
    options: {
      method: 'POST',
      body: action.payload,
      uri: '/api/users/login'
    },
    onSuccess: loginSuccess,
    onFaild: loginFaild
  }));
  // .then(({ success, message, data }) => (success
  //   ? dispatch(loginSuccess(data))
  //   : dispatch(loginFaild(message))))
  // .catch((err) => dispatch(loginFaild('Something gone wrong,please try again later ')));
};

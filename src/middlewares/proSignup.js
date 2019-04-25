
import { SIGN_UP } from 'constantsTypes';

import apiRequest from './helpers/apiRequest';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== SIGN_UP) return next(action);

  const { payload, meta = {} } = action;
  apiRequest({
    method: 'POST',
    body: payload,
    uri: '/api/users/prosignup',
    contentType: 'json'
  })
    .then(({ success, message, data }) => {
      if (success) {
        if (meta.onSuccess) meta.onSuccess(message);
        //   dispatch(signUpSuccess(data))
      } else if (meta.onFailed) {meta.onFailed(message);}
    })
    .catch((err) => {
      if (meta.onFailed) meta.onFailed(err);
    });
};


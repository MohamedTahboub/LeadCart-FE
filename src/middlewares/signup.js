
import { SIGN_UP } from 'constantsTypes';

import apiRequest from './helpers/apiRequest';

export default () => (next) => (action) => {
  if (action.type !== SIGN_UP) return next(action);

  let endpoint = '/api/users/prosignup';
  const { payload, meta = {} } = action;
  if (meta.trial) endpoint = '/api/users/signup';
  apiRequest({
    method: 'POST',
    body: payload,
    uri: endpoint,
    contentType: 'json'
  })
    .then(({ success, message }) => {
      if (success) {
        if (meta.onSuccess) meta.onSuccess(message);
        //   dispatch(signUpSuccess(data))
      } else if (meta.onFailed) {meta.onFailed(message);}
    })
    .catch((err) => {
      if (meta.onFailed) meta.onFailed(err);
    });
};


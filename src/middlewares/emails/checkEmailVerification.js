import { CHECK_EMAIL_VERIFICATION } from 'constantsTypes';

import {
  checkEmailVerificationSuccess,
  checkEmailVerificationFailed
} from 'actions/emails';

import { apiRequest } from 'actions/apiRequest';

export default ({ dispatch }) => (next) => (action) => {

  if (action.type !== CHECK_EMAIL_VERIFICATION) return next(action);

  const { payload, meta } = action;


  dispatch(apiRequest({
    options: {
      method: 'PUT',
      body: payload,
      uri: '/api/emails',
      contentType: 'json'
    },
    onSuccess: (data) => {

      if (meta.onSuccess)
        meta.onSuccess(data)
      return checkEmailVerificationSuccess(payload),
    },
    onFailed: (message) = {
      if(meta.onFailed)
        meta.onFailed(message)

      return checkEmailVerificationFailed(message)
} 
  }));
};


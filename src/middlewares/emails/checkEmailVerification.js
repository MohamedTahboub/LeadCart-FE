import { CHECK_EMAIL_VERIFICATION } from 'constantsTypes';

import {
  checkEmailVerificationFailed,
  checkEmailVerificationSuccess
} from 'actions/emails';

import { apiRequest } from 'actions/apiRequest';

export default ({ dispatch }) => (next) => (action) => {

  if (action.type !== CHECK_EMAIL_VERIFICATION) return next(action);

  const { payload, meta = {} } = action;


  dispatch(apiRequest({
    options: {
      method: 'POST',
      body: payload,
      uri: '/api/brands/emails/check',
      contentType: 'json'
    },
    onSuccess: (data) => {
      if (meta.onSuccess) meta.onSuccess(data);
      return checkEmailVerificationSuccess(payload);
    },
    onFailed: (message) => {
      if (meta.onFailed) meta.onFailed(message);
      return checkEmailVerificationFailed(message);
    }
  }));
};


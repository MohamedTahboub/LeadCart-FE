import { VERIFY_SOURCE_EMAIL } from 'constantsTypes';

import {
  verifyEmailSourceSuccess,
  verifyEmailSourceFailed
} from 'actions/emails';

import { apiRequest } from 'actions/apiRequest';

export default ({ dispatch }) => (next) => (action) => {

  if (action.type !== VERIFY_SOURCE_EMAIL) return next(action);

  const { payload, meta } = action;


  dispatch(apiRequest({
    options: {
      method: 'POST',
      body: payload,
      uri: '/api/brands/emails/verify',
      contentType: 'json'
    },
    onSuccess: (data) => {

      if (meta.onSuccess)
        meta.onSuccess(data)
      return verifyEmailSourceSuccess(payload)
    },
    onFailed: (message) => {
      if (meta.onFailed)
        meta.onFailed(message)

      return verifyEmailSourceFailed(message)
    }
  }));
};


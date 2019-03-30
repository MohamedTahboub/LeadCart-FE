import { UPDATE_EMAIL_FOOTER } from 'constantsTypes';

import {
  updateEmailFooterSuccess,
  updateEmailFooterFailed
} from 'actions/emails';

import { apiRequest } from 'actions/apiRequest';

export default ({ dispatch }) => (next) => (action) => {

  if (action.type !== UPDATE_EMAIL_FOOTER) return next(action);

  const { payload, meta } = action;


  dispatch(apiRequest({
    options: {
      method: 'POST',
      body: payload,
      uri: '/api/emails',
      contentType: 'json'
    },
    onSuccess: (data) => {

      if (meta.onSuccess)
        meta.onSuccess(data)
      return updateEmailFooterSuccess(payload),
    },
    onFailed: (message) = {
      if(meta.onFailed)
        meta.onFailed(message)

      return updateEmailFooterFailed(message)
} 
  }));
};


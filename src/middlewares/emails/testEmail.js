import { TEST_EMAIL } from 'constantsTypes';

import {
  testEmailSuccess,
  testEmailFailed
} from 'actions/emails';

import { apiRequest } from 'actions/apiRequest';

export default ({ dispatch }) => (next) => (action) => {

  if (action.type !== TEST_EMAIL) return next(action);

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
      return testEmailSuccess(payload),
    },
    onFailed: (message) = {
      if(meta.onFailed)
        meta.onFailed(message)

      return testEmailFailed(message)
} 
  }));
};


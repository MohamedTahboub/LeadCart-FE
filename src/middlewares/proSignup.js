
import { SIGN_UP } from 'constantsTypes';

import {
  signUpSuccess,
  signUpFailed
} from 'actions/signup';
import apiRequest from './helpers/apiRequest';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== SIGN_UP) return next(action);


  apiRequest({
    method: 'POST',
    body: action.payload,
    uri: '/api/users/prosignup',
    contentType: 'json'
  })
    .then(({ success, message, data }) => (success
      ? dispatch(signUpSuccess(data))
      : dispatch(signUpFailed(message))))
    .catch((err) => dispatch(signUpFailed(err.message)));
};


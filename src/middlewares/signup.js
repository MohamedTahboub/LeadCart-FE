
import { SIGN_UP } from 'constantsTypes';

import {
  signUpSuccess,
  signUpFaild
} from 'actions/signup';
import apiRequest from './helpers/apiRequest';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== SIGN_UP) return next(action);


  apiRequest({
    method: 'POST',
    body: action.payload,
    uri: '/api/users/signup',
    contentType: 'json'
  })
    .then(({ success, message, data }) => (success
        ? dispatch(signUpSuccess(data))
        : dispatch(signUpFaild(message))))
    .catch((err) => dispatch(signUpFaild(err.message)));
};


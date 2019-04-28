import {
  CHANGE_ACCOUNT_DETAILS,
  CHANGE_ACCOUNT_PASSWORD
} from 'constantsTypes';
import {
  onChangeAccountDetailsSuccess,
  onChangeAccountDetailsFailed,
  onChangeAccounPasswordSuccess,
  onChangeAccounPasswordFailed
} from 'actions/account';
import { apiRequest } from 'actions/apiRequest';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== CHANGE_ACCOUNT_DETAILS && action.type !== CHANGE_ACCOUNT_PASSWORD) return next(action);


  const options = {
    method: 'put',
    body: action.payload,
    contentType: 'json',
    uri: '/api/users/profile'
  };

  let behaviors = {
    onSuccess: onChangeAccountDetailsSuccess,
    onFailed: onChangeAccountDetailsFailed
  };


  if (action.type === CHANGE_ACCOUNT_PASSWORD) {
    options.uri = '/api/users/password';
    behaviors = {
      onSuccess: onChangeAccounPasswordSuccess,
      onFailed: onChangeAccounPasswordFailed
    };
  }


  dispatch(apiRequest({
    options,
    ...behaviors
  }));
};

import {
  CHANGE_ACCOUNT_DETAILS,
  CHANGE_ACCOUNT_PASSWORD
} from 'constantsTypes';
import {
  onChangeAccountDetailsSuccess,
  onChangeAccountDetailsFaild,
  onChangeAccounPasswordSuccess,
  onChangeAccounPasswordFaild
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
    onFaild: onChangeAccountDetailsFaild
  };


  if (action.type === CHANGE_ACCOUNT_PASSWORD) {
    options.uri = '/api/users/password';
    behaviors = {
      onSuccess: onChangeAccounPasswordSuccess,
      onFaild: onChangeAccounPasswordFaild
    };
  }


  dispatch(apiRequest({
    options,
    ...behaviors
  }));
};

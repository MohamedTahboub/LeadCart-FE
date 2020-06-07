import {
  CHANGE_ACCOUNT_DETAILS,
  CHANGE_ACCOUNT_PASSWORD
} from 'constantsTypes';
import {
  onChangeAccountDetailsSuccess,
  onChangeAccountDetailsFailed,
  onChangeAccountPasswordSuccess,
  onChangeAccountPasswordFailed
} from 'actions/account';
import { apiRequest } from 'actions/apiRequest';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== CHANGE_ACCOUNT_DETAILS && action.type !== CHANGE_ACCOUNT_PASSWORD) return next(action);


  const { payload, meta = {} } = action;
  const options = {
    method: 'put',
    body: payload,
    contentType: 'json',
    uri: '/api/users/profile'
  };

  let behaviors = {};

  if (action.type === CHANGE_ACCOUNT_PASSWORD) {
    options.uri = '/api/users/password';
    behaviors = {
      onSuccess: (args) => {
        if (meta.onSuccess) meta.onSuccess(args);

        return onChangeAccountPasswordSuccess(args);
      },
      onFailed: (message) => {
        if (meta.onFailed) meta.onFailed(message);
        return onChangeAccountPasswordFailed(message);
      }
    };
  }
  if (action.type === CHANGE_ACCOUNT_DETAILS) {
    behaviors = {
      onSuccess: (args) => {
        if (meta.onSuccess) meta.onSuccess(args);

        return onChangeAccountDetailsSuccess(args);
      },
      onFailed: (message) => {
        if (meta.onFailed) meta.onFailed(message);
        return onChangeAccountDetailsFailed(message);
      }
    };
  }


  dispatch(apiRequest({
    options,
    ...behaviors
  }));
};

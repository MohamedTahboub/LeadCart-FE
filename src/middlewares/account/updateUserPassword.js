import { CHANGE_ACCOUNT_PASSWORD } from 'constantsTypes';
import { apiRequest } from 'actions/apiRequest';
import {
  onChangeAccountPasswordSuccess,
  onChangeAccountPasswordFailed
} from 'actions/account';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== CHANGE_ACCOUNT_PASSWORD) return next(action);

  const { payload, meta = {} } = action;
  dispatch(apiRequest({
    options: {
      method: 'PUT',
      body: payload,
      uri: '/api/users/password',
      contentType: 'json'
    },
    onSuccess: (arg) => {
      if (meta.onSuccess) meta.onSuccess(arg);
      return onChangeAccountPasswordSuccess(arg);
    },
    onFailed: (arg) => {
      if (meta.onFailed) meta.onFailed(arg);
      return onChangeAccountPasswordFailed(arg);
    }

  }));
};

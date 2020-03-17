import { CHANGE_ACCOUNT_DETAILS } from 'constantsTypes';
import { apiRequest } from 'actions/apiRequest';

import {
  onChangeAccountDetailsSuccess,
  onChangeAccountDetailsFailed,
} from 'actions/account';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== CHANGE_ACCOUNT_DETAILS) return next(action);

  const { payload, meta = {} } = action;
  dispatch(apiRequest({
    options: {
      method: 'PUT',
      body: payload,
      uri: '/api/users/profile',
      contentType: 'json'
    },
    onSuccess: (arg) => {
      if (meta.onSuccess) meta.onSuccess(arg);
      return onChangeAccountDetailsSuccess(arg);
    },
    onFailed: (arg) => {
      if (meta.onFailed) meta.onFailed(arg);
      return onChangeAccountDetailsFailed(arg);
    }

  }));
};

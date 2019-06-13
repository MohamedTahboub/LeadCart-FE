import {  CHANGE_SUB_ACCOUNT_STATUS} from '../../constantsTypes';
import { changeSubAccountStatusSuccess, changeSubAccountStatusFailed } from '../../actions/agency';
import { apiRequest } from 'actions/apiRequest';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== CHANGE_SUB_ACCOUNT_STATUS) return next(action);


  const { payload, meta = {} } = action;
  dispatch(apiRequest({
    options: {
      method: 'PUT',
      body: action.payload,
      uri: '/api/users/agents',
      contentType: 'json'
    },
    onSuccess: (args) => {
      if (meta.onSuccess) meta.onSuccess(args);
      return changeSubAccountStatusSuccess(payload);
    },
    onFailed: (message) => {
      if (meta.onFailed) meta.onFailed(message);
      return changeSubAccountStatusFailed(message);
    }
  }));
};


import { DELETE_SUB_ACCOUNT } from '../../constantsTypes';
import { deleteSubAccountSuccess, deleteSubAccountFailed } from '../../actions/agency';
import { apiRequest } from 'actions/apiRequest';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== DELETE_SUB_ACCOUNT) return next(action);

  const { payload, meta = {} } = action
  dispatch(apiRequest({
    options: {
      method: 'DELETE',
      body: payload,
      uri: '/api/users/agents',
      contentType: 'json'
    },
    onSuccess: (args) => {
      if (meta.onSuccess)
        meta.onSuccess(args)
      return deleteSubAccountSuccess(payload)
    },
    onFailed: (message) => {
      if (meta.onFailed)
        meta.onFailed(message)
      return deleteSubAccountFailed(message)
    }
  }));
};


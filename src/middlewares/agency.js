import { CREATE_SUB_ACCOUNT } from 'constantsTypes';
import { onCreateSubAccountSuccess, onCreateSubAccountFaild } from 'actions/agency';
import { apiRequest } from 'actions/apiRequest';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== CREATE_SUB_ACCOUNT) return next(action);

  dispatch(apiRequest({
    options: {
      method: 'POST',
      body: action.payload,
      uri: '/api/users/agents/',
      contentType: 'json'
    },
    onSuccess: onCreateSubAccountSuccess,
    onFaild: onCreateSubAccountFaild
  }));
};


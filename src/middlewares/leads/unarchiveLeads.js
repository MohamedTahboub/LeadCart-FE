import { UNARCHIVE_LEADS } from 'constantsTypes';
import { apiRequest } from 'actions/apiRequest';
import {
  unarchiveLeadsFailed,
  unarchiveLeadsSuccess
} from 'actions/leads';


export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== UNARCHIVE_LEADS) return next(action);

  const { payload, meta = {} } = action;

  dispatch(apiRequest({
    options: {
      method: 'POST',
      body: payload,
      uri: '/api/brands/leads/restore',
      contentType: 'json'
    },
    onSuccess: (data) => {
      if (meta.onSuccess) meta.onSuccess(data);
      return unarchiveLeadsSuccess(payload);
    },
    onFailed: (message) => {
      if (meta.onFailed) meta.onFailed(message);
      return unarchiveLeadsFailed(message);
    }
  }));
};


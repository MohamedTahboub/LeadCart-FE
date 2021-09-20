import { ARCHIVE_LEADS } from 'constantsTypes';
import { apiRequest } from 'actions/apiRequest';
import {
  archiveLeadsFailed,
  archiveLeadsSuccess
} from 'actions/leads';


export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== ARCHIVE_LEADS) return next(action);

  const { payload, meta = {} } = action;

  dispatch(apiRequest({
    options: {
      method: 'POST',
      body: payload,
      uri: '/api/brands/leads/archive',
      contentType: 'json'
    },
    onSuccess: (data) => {
      if (meta.onSuccess) meta.onSuccess(data);
      return archiveLeadsSuccess(payload);
    },
    onFailed: (message) => {
      if (meta.onFailed) meta.onFailed(message);
      return archiveLeadsFailed(message);
    }
  }));
};


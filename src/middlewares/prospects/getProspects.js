import { GET_BRAND_PROSPECTS } from 'constantsTypes';
import { apiRequest } from 'actions/apiRequest';
import {
  getBrandProspectsFailed,
  getBrandProspectsSuccess
} from 'actions/prospects';


export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== GET_BRAND_PROSPECTS) return next(action);

  const { meta = {} } = action;

  dispatch(apiRequest({
    options: {
      method: 'GET',
      uri: '/api/brands/prospects',
      contentType: 'json'
    },
    onSuccess: (data) => {
      if (meta.onSuccess) meta.onSuccess(data);
      return getBrandProspectsSuccess(data);
    },
    onFailed: (message) => {
      if (meta.onFailed) meta.onFailed(message);
      return getBrandProspectsFailed(message);
    }
  }));
};


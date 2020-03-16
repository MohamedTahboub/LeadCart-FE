
import {
  deleteBrandSuccess,
  deleteBrandFailed,
} from '../../actions/brands';
import { apiRequest } from '../../actions/apiRequest';
import { DELETE_BRAND } from '../../constantsTypes';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== DELETE_BRAND) return next(action);

  const { payload, meta = {} } = action;

  dispatch(apiRequest({
    options: {
      method: 'delete',
      body: payload,
      uri: '/api/brands',
      contentType: 'json'
    },
    onSuccess: (args) => {
      if (meta.onSuccess) meta.onSuccess(args);
      return deleteBrandSuccess(args);
    },
    onFailed: (message) => {
      if (meta.onFailed) meta.onFailed(message);

      return deleteBrandFailed(message);
    }
  }));
};

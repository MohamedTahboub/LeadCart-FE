
import {
  createBrandSuccess,
  createBrandFailed,
} from '../../actions/brands';
import { apiRequest } from '../../actions/apiRequest';
import { CREATE_BRAND } from '../../constantsTypes';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== CREATE_BRAND) return next(action);

  const { payload, meta = {} } = action;

  dispatch(apiRequest({
    options: {
      method: 'post',
      body: payload,
      uri: '/api/brands/',
      contentType: 'json'
    },
    onSuccess: (args) => {
      if (meta.onSuccess) meta.onSuccess(args);
      return createBrandSuccess(args);
    },
    onFailed: (message) => {
      if (meta.onFailed) meta.onFailed(message);

      return createBrandFailed(message);
    }
  }));
};


import { UPGRADE_USER_PACKAGE } from 'constantsTypes';
import { apiRequest } from '../../actions/apiRequest';
import {
  upgradeUserPackageSuccess,
  upgradeUserPackageFailed,
} from '../../actions/billing';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== UPGRADE_USER_PACKAGE) return next(action);

  const { payload, meta = {} } = action;
  dispatch(apiRequest({
    options: {
      method: 'POST',
      body: payload,
      uri: '/api/brands/upgrade',
      contentType: 'json'
    },
    onSuccess: (arg) => {
      if (meta.onSuccess) meta.onSuccess(arg);
      return upgradeUserPackageSuccess(arg);
    },
    onFailed: (arg) => {
      if (meta.onFailed) meta.onFailed(arg);
      return upgradeUserPackageFailed(arg);
    }

  }));
};

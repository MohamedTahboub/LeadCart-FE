import { ADD_NEW_SHIPPING_ROLE } from 'constantsTypes';
import { addNewShippingRoleFailed, addNewShippingRoleSuccess } from 'actions/shippingRoles';
import { apiRequest } from 'actions/apiRequest';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== ADD_NEW_SHIPPING_ROLE) return next(action);
  const { payload, meta = {} } = action;

  dispatch(apiRequest({
    options: {
      method: 'POST',
      uri: '/api/brands/shippingRoles',
      body: payload,
      contentType: 'json'
    },
    onSuccess: (args) => {
      if (meta.onSuccess) meta.onSuccess(args);
      return addNewShippingRoleSuccess(args);
    },
    onFailed:  (message) => {
      if (meta.onFailed) meta.onFailed(message);
      return addNewShippingRoleFailed(message);
    }
  }));
};


import { DELETE_SHIPPING_ROLE } from 'constantsTypes';
import { deleteShippingRoleFailed, deleteShippingRoleSuccess } from 'actions/shippingRoles';
import { apiRequest } from 'actions/apiRequest';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== DELETE_SHIPPING_ROLE) return next(action);
  const { payload, meta = {} } = action;

  dispatch(apiRequest({
    options: {
      method: 'DELETE',
      uri: '/api/brands/shippingRoles',
      body: payload,
      contentType: 'json'
    },
    onSuccess: (args) => {
      if (meta.onSuccess) meta.onSuccess(args);
      return deleteShippingRoleSuccess(payload);
    },
    onFailed:  (message) => {
      if (meta.onFailed) meta.onFailed(message);
      return deleteShippingRoleFailed(message);
    }
  }));
};


import { EDIT_SHIPPING_ROLE } from 'constantsTypes';
import { editShippingRoleFailed, editShippingRoleSuccess } from 'actions/shippingRoles';
import { apiRequest } from 'actions/apiRequest';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== EDIT_SHIPPING_ROLE) return next(action);
  const { payload, meta = {} } = action;

  dispatch(apiRequest({
    options: {
      method: 'PUT',
      uri: '/api/brands/shippingRoles',
      body: payload,
      contentType: 'json'
    },
    onSuccess: (args) => {
      if (meta.onSuccess) meta.onSuccess(args);
      return editShippingRoleSuccess(payload);
    },
    onFailed:  (message) => {
      if (meta.onFailed) meta.onFailed(message);
      return editShippingRoleFailed(message);
    }
  }));
};


import { DELETE_SHIPPING_RULE } from 'constantsTypes';
import { deleteShippingRuleFailed, deleteShippingRuleSuccess } from 'actions/shippingRules';
import { apiRequest } from 'actions/apiRequest';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== DELETE_SHIPPING_RULE) return next(action);
  const { payload, meta = {} } = action;

  dispatch(apiRequest({
    options: {
      method: 'DELETE',
      uri: '/api/brands/shippingRules',
      body: payload,
      contentType: 'json'
    },
    onSuccess: (args) => {
      if (meta.onSuccess) meta.onSuccess(args);
      return deleteShippingRuleSuccess(payload);
    },
    onFailed:  (message) => {
      if (meta.onFailed) meta.onFailed(message);
      return deleteShippingRuleFailed(message);
    }
  }));
};


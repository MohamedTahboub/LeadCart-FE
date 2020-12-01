import { ADD_NEW_SHIPPING_RULE } from 'constantsTypes';
import { addNewShippingRuleFailed, addNewShippingRuleSuccess } from 'actions/shippingRules';
import { apiRequest } from 'actions/apiRequest';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== ADD_NEW_SHIPPING_RULE) return next(action);
  const { payload, meta = {} } = action;

  dispatch(apiRequest({
    options: {
      method: 'POST',
      uri: '/api/brands/shipping',
      body: payload,
      contentType: 'json'
    },
    onSuccess: (args) => {
      if (meta.onSuccess) meta.onSuccess(args);
      return addNewShippingRuleSuccess(args);
    },
    onFailed:  (message) => {
      if (meta.onFailed) meta.onFailed(message);
      return addNewShippingRuleFailed(message);
    }
  }));
};


import { EDIT_SHIPPING_RULE } from 'constantsTypes';
import { editShippingRuleFailed, editShippingRuleSuccess } from 'actions/shippingRules';
import { apiRequest } from 'actions/apiRequest';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== EDIT_SHIPPING_RULE) return next(action);
  const { payload, meta = {} } = action;

  dispatch(apiRequest({
    options: {
      method: 'PUT',
      uri: '/api/brands/shipping',
      body: payload,
      contentType: 'json'
    },
    onSuccess: (args) => {
      if (meta.onSuccess) meta.onSuccess(args);
      return editShippingRuleSuccess(args);
    },
    onFailed:  (message) => {
      if (meta.onFailed) meta.onFailed(message);
      return editShippingRuleFailed(message);
    }
  }));
};


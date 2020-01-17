
import { apiRequest } from 'actions/apiRequest';
import { createFunnelRuleSuccess, createFunnelRuleFailed } from '../../../actions/funnels';
import { CREATE_FUNNEL_RULE } from '../../../constantsTypes';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== CREATE_FUNNEL_RULE) return next(action);

  const { payload, meta = {} } = action;

  dispatch(apiRequest({
    options: {
      method: 'post',
      body: payload,
      uri: '/api/funnels/rules',
      contentType: 'json'
    },
    onSuccess: (args) => {
      if (meta.onSuccess) meta.onSuccess(args);
      return createFunnelRuleSuccess(args);
    },
    onFailed: (message) => {
      if (meta.onFailed) meta.onSuccess(message);

      //   return createFunnelRuleFailed(message);
      return createFunnelRuleSuccess(payload);
    }
  }));
};

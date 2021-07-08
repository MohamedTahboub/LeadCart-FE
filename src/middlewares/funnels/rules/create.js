
import { apiRequest } from 'actions/apiRequest';
import { createFunnelRuleFailed, createFunnelRuleSuccess } from '../../../actions/funnels';
import { CREATE_FUNNEL_RULE } from '../../../constantsTypes';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== CREATE_FUNNEL_RULE) return next(action);

  const { payload, meta = {} } = action;

  dispatch(apiRequest({
    options: {
      method: 'post',
      body: payload,
      uri: '/api/brands/funnels/rules',
      contentType: 'json'
    },
    onSuccess: ({ rule }) => {
      if (meta.onSuccess) meta.onSuccess(rule);
      return createFunnelRuleSuccess({
        funnelId: payload.funnel,
        rule
      });
    },
    onFailed: (message) => {
      if (meta.onFailed) meta.onFailed(message);

      return createFunnelRuleFailed(payload);
    }
  }));
};


import { apiRequest } from 'actions/apiRequest';
import { createFunnelRuleFailed, createFunnelRuleSuccess } from '../../../actions/funnels';
import { CREATE_FUNNEL_RULE } from '../../../constantsTypes';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== CREATE_FUNNEL_RULE) return next(action);

  const { payload, meta = {} } = action;
  const { originalFunnelDetails, ...resetOfThePayload } = payload;
  dispatch(apiRequest({
    options: {
      method: 'post',
      body: resetOfThePayload,
      uri: '/api/brands/funnels/rules',
      contentType: 'json'
    },
    onSuccess: ({ rule }) => {
      if (meta.onSuccess) meta.onSuccess(rule);
      return createFunnelRuleSuccess({
        funnelId: payload.funnel,
        originalFunnelDetails,
        rule
      });
    },
    onFailed: (message) => {
      if (meta.onFailed) meta.onFailed(message);

      return createFunnelRuleFailed(payload);
    }
  }));
};

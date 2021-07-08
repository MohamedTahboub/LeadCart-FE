
import { apiRequest } from 'actions/apiRequest';
import { deleteFunnelRuleFailed, deleteFunnelRuleSuccess } from '../../../actions/funnels';
import { DELETE_FUNNEL_RULE } from '../../../constantsTypes';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== DELETE_FUNNEL_RULE) return next(action);

  const { payload, meta = {} } = action;
  const { originalFunnelDetails, ...resetOfThePayload } = payload;
  dispatch(apiRequest({
    options: {
      method: 'delete',
      body: resetOfThePayload,
      uri: '/api/brands/funnels/rules',
      contentType: 'json'
    },
    onSuccess: (args) => {
      if (meta.onSuccess) meta.onSuccess(args);
      return deleteFunnelRuleSuccess(payload);
    },
    onFailed: (message) => {
      if (meta.onFailed) meta.onFailed(message);

      return deleteFunnelRuleFailed(payload);
    }
  }));
};

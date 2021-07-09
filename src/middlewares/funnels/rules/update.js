
import { apiRequest } from 'actions/apiRequest';
import { updateFunnelRuleFailed, updateFunnelRuleSuccess } from '../../../actions/funnels';
import { UPDATE_FUNNEL_RULE } from '../../../constantsTypes';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== UPDATE_FUNNEL_RULE) return next(action);

  const { payload = {}, meta = {} } = action;
  const { originalFunnelDetails, ...resetOfThePayload } = payload;
  dispatch(apiRequest({
    options: {
      method: 'put',
      body: resetOfThePayload,
      uri: '/api/brands/funnels/rules',
      contentType: 'json'
    },
    onSuccess: (args) => {
      if (meta.onSuccess) meta.onSuccess(args);
      return updateFunnelRuleSuccess(payload);
    },
    onFailed: (message) => {
      if (meta.onFailed) meta.onFailed(message);

      return updateFunnelRuleFailed(payload);
    }
  }));
};

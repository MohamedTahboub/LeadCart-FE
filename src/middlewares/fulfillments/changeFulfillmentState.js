import { CHANGE_FULFILLMENT_STATE } from 'constantsTypes';
import { changeFulfillmentStateSuccess, changeFulfillmentStateFailed } from 'actions/fulfillments';
import { apiRequest } from 'actions/apiRequest';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== CHANGE_FULFILLMENT_STATE) return next(action);

  const { payload, meta = {} } = action;

  dispatch(apiRequest({
    options: {
      method: 'put',
      body: payload,
      uri: '/api/fulfillment/state',
      contentType: 'json'
    },
    onSuccess: (args) => {
      if (meta.onSuccess) meta.onSuccess(args);
      return changeFulfillmentStateSuccess(payload);
    },
    onFailed: (message) => {
      if (meta.onFailed) meta.onFailed(message);
      return changeFulfillmentStateFailed(message);
    }
  }));
};

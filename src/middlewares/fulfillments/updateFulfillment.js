import { UPDATE_FULFILLMENT } from 'constantsTypes';
import { updateFulfillmentSuccess, updateFulfillmentFailed } from 'actions/fulfillments';
import { apiRequest } from 'actions/apiRequest';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== UPDATE_FULFILLMENT) return next(action);

  const { payload, meta = {} } = action;

  dispatch(apiRequest({
    options: {
      method: 'put',
      body: payload,
      uri: '/api/fulfillments',
      contentType: 'json'
    },
    onSuccess: (message) => {
      if (meta.onSuccess) meta.onSuccess(message);
      return updateFulfillmentSuccess(payload);
    },
    onFailed: (message) => {
      if (meta) meta.onFailed(message);
      return updateFulfillmentFailed(message);
    }
  }));
};

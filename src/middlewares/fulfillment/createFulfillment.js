import { CREATE_FULFILLMENT } from 'constantsTypes';
import { createFulfillmentSuccess, createFulfillmentFailed } from 'actions/fullfilments';
import { apiRequest } from 'actions/apiRequest';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== CREATE_FULFILLMENT) return next(action);

  const { payload, meta = {} } = action;

  dispatch(apiRequest({
    options: {
      method: 'post',
      body: payload,
      uri: '/api/fulfillments',
      contentType: 'json'
    },
    onSuccess: (args) => {
      if (meta.onSuccess) meta.onSuccess(args);
      return createFulfillmentSuccess(args);
    },
    onFailed: (message) => {
      if (meta.onFailed) meta.onFailed(message);

      return createFulfillmentFailed(message);
    }
  }));
};

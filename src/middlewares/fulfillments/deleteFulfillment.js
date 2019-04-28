import { DELETE_FULFILLMENT } from 'constantsTypes';
import { deleteFulfillmentSuccess, deleteFulfillmentFailed } from 'actions/fulfillments';
import { apiRequest } from 'actions/apiRequest';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== DELETE_FULFILLMENT) return next(action);

  const { payload, meta = {} } = action;
  dispatch(apiRequest({
    options: {
      method: 'delete',
      body: { fulfillmentId: payload },
      uri: '/api/fulfillment',
      contentType: 'json'
    },
    onSuccess: (args) => {
      if (meta.onSuccess) meta.onSuccess(args);
      return deleteFulfillmentSuccess(payload);
    },
    onFailed: (error) => {
      if (meta.onFailed) meta.onFailed(error);
      return deleteFulfillmentFailed(error);
    }
  }));
};

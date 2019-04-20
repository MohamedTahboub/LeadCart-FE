import { GET_FULFILLMENTS } from 'constantsTypes';
import { getFulfillmentsSuccess, getFulfillmentsFailed } from 'actions/fulfillments';
import { apiRequest } from 'actions/apiRequest';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== GET_FULFILLMENTS) return next(action);

  const getSuccess = (fulfillments) => getFulfillmentsSuccess(fulfillments);

  dispatch(apiRequest({
    options: {
      method: 'get',
      uri: '/api/fulfillment',
      contentType: 'json'
    },
    onSuccess: getSuccess,
    onFailed: getFulfillmentsFailed
  }));
};


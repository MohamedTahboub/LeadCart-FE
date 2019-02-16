import { CREATE_UPSELL } from 'constantsTypes';
import { createUpsellSuccess, createUpsellFailed } from 'actions/upsells';
import { apiRequest } from 'actions/apiRequest';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== CREATE_UPSELL) return next(action);


  dispatch(apiRequest({
    options: {
      method: 'post',
      body: action.payload,
      uri: '/api/upsells',
      contentType: 'json'
    },
    onSuccess: createUpsellSuccess,
    onFailed: createUpsellFailed
  }));
};

import { UPDATE_UPSELL } from 'constantsTypes';
import { updateUpsellSuccess, updateUpsellFailed } from 'actions/upsells';
import { apiRequest } from 'actions/apiRequest';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== UPDATE_UPSELL) return next(action);


  dispatch(apiRequest({
    options: {
      method: 'put',
      body: action.payload,
      uri: '/api/upsells',
      contentType: 'json'
    },
    onSuccess: updateUpsellSuccess.bind(this, action.payload),
    onFailed: updateUpsellFailed
  }));
};

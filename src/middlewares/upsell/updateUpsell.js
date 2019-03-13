import { UPDATE_UPSELL } from 'constantsTypes';
import { updateUpsellSuccess, updateUpsellFailed } from 'actions/upsells';
import { apiRequest } from 'actions/apiRequest';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== UPDATE_UPSELL) return next(action);


  const { meta } = action

  const onSuccess = message => {
    if (meta)
      meta.onSuccess(message);

    return updateUpsellSuccess(action.payload)
  }
  const onFailed = message => {
    if (meta)
      meta.onFailed(message);

    return updateUpsellFailed(message)
  }

  dispatch(apiRequest({
    options: {
      method: 'put',
      body: action.payload,
      uri: '/api/upsells',
      contentType: 'json'
    },
    onSuccess,
    onFailed
  }));
};

import { CREATE_UPSELL } from 'constantsTypes';
import { createUpsellSuccess, createUpsellFailed } from 'actions/upsells';
import { apiRequest } from 'actions/apiRequest';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== CREATE_UPSELL) return next(action);

  const { meta } = action

  const onSuccess = message => {
    if (meta)
      meta.onSuccess(message);

    return createUpsellSuccess(message)
  }
  const onFailed = message => {
    if (meta)
      meta.onFailed(message);

    return createUpsellFailed(message)
  }
  dispatch(apiRequest({
    options: {
      method: 'post',
      body: action.payload,
      uri: '/api/upsells',
      contentType: 'json'
    },
    onSuccess,
    onFailed
  }));
};

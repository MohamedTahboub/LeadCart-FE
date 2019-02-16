import { CHANGE_UPSELL_STATE } from 'constantsTypes';
import { changeUpsellStateSuccess, changeUpsellStateFailed } from 'actions/upsells';
import { apiRequest } from 'actions/apiRequest';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== CHANGE_UPSELL_STATE) return next(action);

  dispatch(apiRequest({
    options: {
      method: 'put',
      body: action.payload,
      uri: '/api/upsells/state',
      contentType: 'json'
    },
    onSuccess: changeUpsellStateSuccess.bind(this, action.payload),
    onFailed: changeUpsellStateFailed
  }));
};

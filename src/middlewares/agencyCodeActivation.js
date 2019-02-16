import { activateAgencyCodeSuccess, activateAgencyCodeFailed } from 'actions/promoCode';
import { apiRequest } from 'actions/apiRequest';
import { ACTIVATE_AGENCY_CODE } from '../constantsTypes';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== ACTIVATE_AGENCY_CODE) return next(action);
  dispatch(apiRequest({
    options: {
      method: 'POST',
      body: action.payload,
      uri: '/api/users/promo-code',
      contentType: 'json'
    },
    onSuccess: activateAgencyCodeSuccess,
    onFailed: activateAgencyCodeFailed
  }));
};

import { activatePromocodeSuccess, activatePromocodeFaild } from 'acrion/promocode';
import { PROMO_CODE_ACTIVATE } from '../constantsTypes';


export default ({ dispatch }) => (next) => (action) => {
  if (type !== PROMO_CODE_ACTIVATE) return next(action);


  apiRequest({
    method: 'POST',
    body: action.payload,
    uri: '/users/promo-code'
  })
    .then(({ status, ...response }) => (status
      ? dispatch(activatePromocodeSuccess(response))
      : dispatch(activatePromocodeFaild(response))))
    .catch((err) => dispatch(activatePromocodeFaild(err.message)));
};

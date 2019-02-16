import { GET_UPSELLS } from 'constantsTypes';
import { getUpsellsSuccess, getUpsellsFailed } from 'actions/upsells';
import { apiRequest } from 'actions/apiRequest';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== GET_UPSELLS) return next(action);


  const getSuccess = (upsells) => {
    console.log(upsells);
    return getUpsellsSuccess(upsells);
  };

  dispatch(apiRequest({
    options: {
      method: 'get',
      uri: '/api/upsells',
      contentType: 'json'
    },
    onSuccess: getSuccess,
    onFailed: getUpsellsFailed
  }));
};


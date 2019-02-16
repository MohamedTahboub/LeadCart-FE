import { DELETE_UPSELL } from 'constantsTypes';
import { deleteUpsellSuccess, deleteUpsellFailed } from 'actions/upsells';
import { apiRequest } from 'actions/apiRequest';

export default ({ dispatch, getState }) => (next) => (action) => {
  if (action.type !== DELETE_UPSELL) return next(action);


  dispatch(apiRequest({
    options: {
      method: 'delete',
      body: { upsellId: action.payload },
      uri: '/api/upsells',
      contentType: 'json'
    },
    onSuccess: deleteUpsellSuccess.bind(this, action.payload),
    onFailed: deleteUpsellFailed
  }));
  // restore the application stored data in the loaclStorage
};

import { deleteProductsFontsFailed, deleteProductsFontsSuccess } from '../../actions/productsFonts';
import { apiRequest } from '../../actions/apiRequest';
import { DELETE_PRODUCTS_FONTS } from '../../constantsTypes';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== DELETE_PRODUCTS_FONTS) return next(action);

  const { payload, meta = {} } = action;

  dispatch(apiRequest({
    options: {
      method: 'DELETE',
      body: payload,
      uri: '/api/brands/productsFonts',
      contentType: 'json'
    },
    onSuccess: () => {
      if (meta.onSuccess) meta.onSuccess();
      return deleteProductsFontsSuccess(payload.fontsIds);
    },
    onFailed: (message) => {
      if (meta.onFailed) meta.onFailed();
      // return deleteProductsFontsFailed(message);
      return deleteProductsFontsSuccess(payload.fontsIds);

    }
  }));
};


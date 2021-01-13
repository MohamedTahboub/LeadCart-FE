import { addNewProductsFontsFailed, addNewProductsFontsSuccess } from '../../actions/productsFonts';
import { apiRequest } from '../../actions/apiRequest';
import { ADD_NEW_PRODUCTS_FONTS } from '../../constantsTypes';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== ADD_NEW_PRODUCTS_FONTS) return next(action);

  const { payload, meta = {} } = action;

  dispatch(apiRequest({
    options: {
      method: 'PUSH',
      body: payload,
      uri: '/api/brands/productsFonts',
      contentType: 'json'
    },
    onSuccess: () => {
      if (meta.onSuccess) meta.onSuccess();
      return addNewProductsFontsSuccess(payload?.productsFonts);
    },
    onFailed: (message) => {
      if (meta.onFailed) meta.onFailed();
      // return addNewProductsFontsFailed(message);
      return addNewProductsFontsSuccess(payload?.productsFonts);

    }
  }));
};


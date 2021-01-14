import { addNewProductsFontsFailed, addNewProductsFontsSuccess } from '../../actions/productsFonts';
import { apiRequest } from '../../actions/apiRequest';
import { ADD_NEW_PRODUCTS_FONTS } from '../../constantsTypes';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== ADD_NEW_PRODUCTS_FONTS) return next(action);

  const { payload, meta = {} } = action;

  dispatch(apiRequest({
    options: {
      method: 'POST',
      body: payload,
      uri: '/api/brands/products-fonts',
      contentType: 'json'
    },
    onSuccess: (arg) => {
      if (meta.onSuccess) meta.onSuccess();
      return addNewProductsFontsSuccess(arg.filter((ele) => ele));
    },
    onFailed: (message) => {
      if (meta.onFailed) meta.onFailed();
      return addNewProductsFontsFailed(message);

    }
  }));
};


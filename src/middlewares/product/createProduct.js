import { CREATE_NEW_PRODUCT } from 'constantsTypes';
import { productCreated, productCreatingFaild } from 'actions/product';
import { apiRequest } from 'actions/apiRequest';

export default ({ dispatch, getState }) => (next) => (action) => {
  if (action.type !== CREATE_NEW_PRODUCT) return next(action);

  const { product: { details } } = getState();
  let price = 120;
  let paymentType = 'Split';
  if (details.payment) {
    paymentType = Object.keys(details.payment)[0];
    price = details.payment[paymentType].price;
  }

  const product = {
    ...details,
    type: 'digital',
    price: {
      amount: +(price)
    },
    payment: {
      type: 'onetime',
    }

  };

  dispatch(apiRequest({
    options: {
      method: 'POST',
      body: product,
      uri: '/api/products',
      contentType: 'json'
    },
    onSuccess: productCreated,
    onFaild: productCreatingFaild
  }));
  // restore the application stored data in the loaclStorage
};

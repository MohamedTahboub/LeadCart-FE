
import { UPDATE_PRODUCT } from 'constantsTypes';
import { productUpdatedSuccessfuly, productUpdatedFaild } from 'actions/product';
import { apiRequest } from 'actions/apiRequest';

export default ({ dispatch, getState }) => (next) => (action) => {
  if (action.type !== UPDATE_PRODUCT) return next(action);

  const { product } = getState()
  console.log(product)
  const {
    checkoutPage,
    mandatoryDetails,
    boosters,
    payment,
    fullfillment,
    settings,
    offer,
    thankYouPage
  } = product
  const { _id: productId, ...details } = mandatoryDetails
  console.log('============', JSON.stringify({
    productId,
    details: {
      ...details,
      checkoutPage: { ...checkoutPage, ...boosters },
      payment,
      offer,
      settings
    }
  }
    , null, 2))
  // dispatch(apiRequest({
  //   options: {
  //     method: 'put',
  //     body: action.payload,
  //     uri: '/api/products',
  //     contentType: 'json'
  //   },
  //   onSuccess: productUpdatedSuccessfuly,
  //   onFaild: productUpdatedFaild
  // }));
  // restore the application stored data in the loaclStorage
};

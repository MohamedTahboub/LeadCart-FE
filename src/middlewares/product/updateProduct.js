
import { UPDATE_PRODUCT } from 'constantsTypes';
import { productUpdatedSuccessfuly, productUpdatedFaild } from 'actions/product';
import { apiRequest } from 'actions/apiRequest';

import * as modles from '../helpers/models';
import modeler from '../helpers/modeler';

export default ({ dispatch, getState }) => (next) => (action) => {
  if (action.type !== UPDATE_PRODUCT) return next(action);

  const { product } = getState();
  // console.log(product);
  // const { _id: productId, ...details } = mandatoryDetails;
  // console.log('============', JSON.stringify(getProductFromat(product), null, 2));
  dispatch(apiRequest({
    options: {
      method: 'put',
      body: getProductFromat(product),
      uri: '/api/products',
      contentType: 'json'
    },
    onSuccess: productUpdatedSuccessfuly.bind(this, product),
    onFaild: productUpdatedFaild
  }));
  // restore the application stored data in the loaclStorage
};

function getProductFromat (product) {
  const {
    checkoutPage,
    mandatoryDetails,
    boosters,
    payment,
    fullfillment,
    settings,
    offer,
    thankYouPage
  } = Object.keys(modles).reduce((final, key) => {
    final[key] = modeler(product[key], modles[key]);
    return final;
  }, {});

  const { _id: productId, ...details } = mandatoryDetails;

  return {
    productId,
    details: {
      ...details,
      checkoutPage: { ...checkoutPage, ...boosters },
      payment: { ...payment, methods: ['Stripe'] },
      offer,
      settings
    }
  };
}


// const payload = {
//   settings: modeler(productDetails.settings, settings),
//   checkoutPage: modeler(productDetails.checkoutPage, checkoutPage),
//   mandatoryDetails: modeler(productDetails, mandatoryDetails),
//   payment: modeler(productDetails.payment, payment),
//   fullfillment: modeler(productDetails, fullfillment),
//   boosters: modeler(productDetails.checkoutPage, boosters),
//   offer: modeler(productDetails.offer, offer),
//   thankYouPage: modeler(productDetails.payment, thankYouPage)
// };

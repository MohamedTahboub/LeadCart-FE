// import checkoutPage from './checkoutPage';
// import mandatoryDetails from './mandatoryDetails';
// import boosters from './boosters';
// import payment from './payment';
// import fullfillment from './fullfillment';
// import settings from './settings';
// import offer from './offer';
// import thankYouPage from './thankYouPage';


// export default [
//   checkoutPage,
//   mandatoryDetails,
//   boosters,
//   payment,
//   fullfillment,
//   settings,
//   offer,
//   thankYouPage,
// ];
import { GET_PRODUCT_SUCCESS } from 'constantsTypes';
import modeler from '../../helpers/modeler';
import {
  settings,
  checkoutPage,
  mandatoryDetails,
  payment,
  fullfillment,
  boosters,
  offer,
  thankYouPage
} from '../../helpers/models';

export default () => (next) => (action) => {
  if (action.type !== GET_PRODUCT_SUCCESS) return next(action);
  const productDetails = action.payload;

  const payload = {
    settings: modeler(productDetails.settings, settings),
    checkoutPage: modeler(productDetails.checkoutPage, checkoutPage),
    mandatoryDetails: modeler(productDetails, mandatoryDetails),
    payment: modeler(productDetails.payment, payment),
    fullfillment: modeler(productDetails, fullfillment),
    boosters: modeler(productDetails.checkoutPage, boosters),
    offer: modeler(productDetails.offer, offer),
    thankYouPage: modeler(productDetails.payment, thankYouPage)
  };

  action.payload = payload;
  next(action);
};

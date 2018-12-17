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
import { GET_PRODUCT_SUCCESS, UPDATE_PRODUCT_SUCCESS } from 'constantsTypes';
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
  if (action.type !== GET_PRODUCT_SUCCESS && action.type !== UPDATE_PRODUCT_SUCCESS) return next(action);

  // const productDetails = action.payload;
  let isLocal = false;
  if (action.type === UPDATE_PRODUCT_SUCCESS) isLocal = true;

  action.payload = checkStepsCompletion(action.payload, isLocal);
  next(action);
};

function checkStepsCompletion (productDetails, isLocal) {
  delete productDetails.newProduct;
  const completionCritiria = {
    checkoutPage: ['template', 'presetColors'],
    mandatoryDetails: ['name', 'url', 'image', 'description', 'price'],
    boosters: ['termsAndConditions'],
    payment: ['methods'],
    fullfillment: ['file'],
    settings: ['footerScript', 'postOrderScript', 'checkOutPageRedirect'],
    offer: ['enabled', 'name', 'title', 'price', 'introText', 'bodyText', 'successUrl'],
    thankYouPage: ['useCustomeThankPage']
  };
  const product = !isLocal ? {
    settings: modeler(productDetails.settings, settings),
    checkoutPage: modeler(productDetails.checkoutPage, checkoutPage),
    mandatoryDetails: modeler(productDetails, mandatoryDetails),
    payment: modeler(productDetails.payment, payment),
    fullfillment: modeler(productDetails, fullfillment),
    boosters: modeler(productDetails.checkoutPage, boosters),
    offer: modeler(productDetails.offer, offer),
    thankYouPage: modeler(productDetails.payment, thankYouPage)
  } : productDetails;

  console.log('==============>>>>>>', product);
  const productInjected = Object.keys(product).reduce((prod, stepKey) => {
    prod[stepKey] = { ...product[stepKey], completed: checkIfProductStepCompleted(product[stepKey], completionCritiria[stepKey]) };
    return prod;
  }, {});

  return productInjected;
}

function checkIfProductStepCompleted (step = {}, shouldContainList = [], ignoreList = []) {
  return shouldContainList.map((key) => {
    if (step[key]) return true;
    return false;
  }).filter((c) => c).length === shouldContainList.length;
}

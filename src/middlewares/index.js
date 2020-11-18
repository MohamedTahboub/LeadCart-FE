import appInit from './appInit';
import apiRequest from './apiRequest';
import login from './login';
import signup from './signup';
import agencyCodeActivation from './agencyCodeActivation';
import storage from './storage';
import uploadingFiles from './uploadingFiles';
import settings from './settings';
import product from './product';
import products from './products';
import notificationCenter from './notificationCenter';
import flashMessage from './flashMessage';
import payments from './payments';
import account from './account';
import coupon from './coupon';
import subAccounts from './subAccounts';
import teamMembers from './teamMembers';
import modelsShapers from './modelsShapers';
import updateUserImage from './updateUserImage';
import formsValidations from './formsValidations';
import upsells from './upsell';
import fulfillments from './fulfillments';
import emails from './emails';
import customers from './customers';
import billing from './billing';
import eventsTracker from './eventsTracker';
import dashboard from './dashboard';
import funnels from './funnels';
import translations from './translations';
import integrations from './integrations';
import brands from './brands';
import taxes from './taxes';
import taxZones from './taxZones';
import shippingRules from './shippingRules';


export default [
  eventsTracker,
  appInit,
  ...formsValidations,
  ...modelsShapers,
  notificationCenter,
  login,
  signup,
  ...settings,
  products,
  ...upsells,
  ...funnels,
  ...fulfillments,
  payments,
  ...product,
  ...account,
  ...coupon,
  ...billing,
  ...translations,
  updateUserImage,
  ...emails,
  ...customers,
  teamMembers,
  agencyCodeActivation,
  ...subAccounts,
  ...dashboard,
  ...integrations,
  ...brands,
  flashMessage,
  apiRequest,
  uploadingFiles,
  storage,
  ...taxes,
  ...taxZones,
  ...shippingRules
];

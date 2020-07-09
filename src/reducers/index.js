import { combineReducers } from 'redux';
import user from './user';
import loading from './loading';
import validation from './validation';
import files from './files';
import product from './product/index';
import products from './products';
import activities from './activities';
import customers from './customers';
import payments from './payments';
import flashMessage from './flashMessage';
import modals from './modals';
import account from './account';
import coupons from './coupons';
import teamMembers from './teamMembers';
import settings from './settings';
import agency from './agency';
import upsells from './upsells';
import fulfillments from './fulfillments';
import emails from './emails';
import dashboard from './dashboard';
import orders from './orders';
import funnels from './funnels';
import translations from './translations';
import brands from './brands';
import integrations from './integrations';
import workspace from './workspace';
import redemption from './redemption';


const rootReducer = combineReducers({
  user,
  loading,
  files,
  product,
  products,
  activities,
  orders,
  customers,
  modals,
  settings,
  emails,
  account,
  coupons,
  upsells,
  fulfillments,
  teamMembers,
  agency,
  payments,
  flashMessage,
  dashboard,
  funnels,
  translations,
  validation,
  brands,
  integrations,
  workspace,
  redemption
});

export default rootReducer;

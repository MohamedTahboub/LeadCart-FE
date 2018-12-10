import { combineReducers } from 'redux';
import checkoutPage from './checkoutPage';
import offer from './offer';
import settings from './settings';
import thankYouPage from './thankYouPage';
import boosters from './boosters';
import payment from './payment';
import fullfillment from './fullfillment';
import mandatoryDetails from './mandatoryDetails';

export default combineReducers({
  checkoutPage,
  mandatoryDetails,
  boosters,
  payment,
  fullfillment,
  settings,
  offer,
  thankYouPage,
});

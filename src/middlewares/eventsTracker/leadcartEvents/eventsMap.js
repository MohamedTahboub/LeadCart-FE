import * as actions from '../../../constantsTypes';


// export const onRefresh = actionsConstants.APP_INIT;

export default (type) => {
  switch (type) {
  case actions.SIGN_UP_SUCCESS: return 'onSignup';
  case actions.UPDATE_MARKETPLACE_SETTINGS_SUCCESS: return 'onUpdateBrandSettings';
  case actions.ACTIVATE_PAYMENT_SUCCESS: return 'onConnectPaymentGateway';
  case actions.PRODUCT_CREATED_SUCCESSFULY: return 'onCreateProduct';
  case actions.GET_ACTIVITIES: return 'onOrders';
  case actions.LOGIN_SUCCESS: return 'onLogin';
  case actions.LOGOUT: return 'onLogout';
  case actions.UPGRADE_USER_PACKAGE_SUCCESS: return 'onUserUpgrade';
  default: return 'any';
  }
};

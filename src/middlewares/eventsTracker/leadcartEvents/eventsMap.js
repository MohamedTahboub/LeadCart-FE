import * as actions from '../../../constantsTypes';


// export const onRefresh = actionsConstants.APP_INIT;

export default (type) => {
  switch (type) {
  case actions.APP_LAUNCH_SUCCESS: return 'onAppLaunch';
  case actions.SIGN_UP_SUCCESS: return 'onSignup';
  case actions.UPDATE_MARKETPLACE_SETTINGS: return 'onUpdateBrandSettings';
  case actions.ACTIVATE_PAYMENT_SUCCESS: return 'onConnectPaymentGateway';
  case actions.PRODUCT_CREATED_SUCCESSFULLY: return 'onCreateProduct';
  case actions.GET_USER_PRODUCTS_SUCCESS: return 'onGetProducts';
  case actions.GET_ACTIVITIES: return 'onOrders';
  case actions.LOGIN_SUCCESS: return 'onLogin';
  case actions.LOGOUT: return 'onLogout';
  case actions.UPGRADE_USER_PACKAGE_SUCCESS: return 'onUserUpgrade';
  default: return 'any';
  }
};

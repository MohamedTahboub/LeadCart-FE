

export const APP_INIT = Symbol('APP_INIT');
export const APP_LAUNCH_SUCCESS = Symbol('APP_LAUNCH_SUCCESS');
export const APP_LAUNCH_FAILED = Symbol('APP_LAUNCH_FAILED');

export const SIGN_UP = Symbol('SIGN_UP');
export const SIGN_UP_SUCCESS = Symbol('SIGN_UP_SUCCESS');
export const SIGN_UP_FAILED = Symbol('SIGN_UP_FAILED');


export const LOGIN = Symbol('LOGIN');
export const LOGIN_SUCCESS = Symbol('LOGIN_SUCCESS');
export const LOGIN_FAILED = Symbol('LOGIN_FAILED');

export const LOGOUT = Symbol('LOGOUT');


export const SIGN_UP_INVALID_FIELDS = Symbol('SIGN_UP_INVALID_FIELDS');
export const LOGIN_INVALID_FIELDS = Symbol('LOGIN_INVALID_FIELDS');

/* PROMO CODE ACTIONS */

/* AGENCY CODE */
export const ACTIVATE_AGENCY_CODE = Symbol('ACTIVATE_AGENCY_CODE');
export const ACTIVATE_AGENCY_CODE_SUCCESS = Symbol('ACTIVATE_AGENCY_CODE_SUCCESS');
export const ACTIVATE_AGENCY_CODE_FAILED = Symbol('ACTIVATE_AGENCY_CODE_FAILED');

export const GET_ACTIVATED_AGENCY_CODES_NUMBERS = Symbol('GET_ACTIVATED_AGENCY_CODES_NUMBERS');

/* AGENCY CODE ENDS */

/* PromoCode actions types */
export const PROMO_CODE_ACTIVATE = Symbol('PROMO_CODE_ACTIVATE');
export const PROMO_CODE_ACTIVATE_SUCCESS = Symbol('PROMO_CODE_ACTIVATE_SUCCESS');
export const PROMO_CODE_ACTIVATE_FAILED = Symbol('PROMO_CODE_ACTIVATE_FAILED');
/* PromoCode actions types ends */

/* Product action types */
export const NEW_PRODUCT_INVALID_FORM = Symbol('NEW_PRODUCT_INVALID_FORM');
export const NEW_PRODUCT_FIELD_UPDATE = Symbol('NEW_PRODUCT_FIELD_UPDATE');

export const PRODUCT_DETAILS_FIELD_UPDATE = Symbol('PRODUCT_DETAILS_FIELD_UPDATE');

export const UPDATE_PRODUCT_DETAILS = Symbol('UPDATE_PRODUCT_DETAILS');
export const UPDATE_PRODUCT_DETAILS_SUCCESS = Symbol('UPDATE_PRODUCT_DETAILS_SUCCESS');
export const UPDATE_PRODUCT_DETAILS_FAILED = Symbol('UPDATE_PRODUCT_DETAILS_FAILED');

// export const UPDATE_PRODUCT_CHECKOUT_TEMPLATE = Symbol('UPDATE_PRODUCT_CHECKOUT_TEMPLATE');
// export const UPDATE_PRODUCT_CHECKOUT_TEMPLATE_SUCCESS = Symbol('UPDATE_PRODUCT_CHECKOUT_TEMPLATE_SUCCESS');
// export const UPDATE_PRODUCT_CHECKOUT_TEMPLATE_FAILED = Symbol('UPDATE_PRODUCT_CHECKOUT_TEMPLATE_FAILED');

// export const UPDATE_PRODUCT_PAYMENT_METHOD = Symbol('UPDATE_PRODUCT_PAYMENT_METHOD');
// export const UPDATE_PRODUCT_BUMP_SETTING = Symbol('UPDATE_PRODUCT_BUMP_SETTING');
// export const UPDATE_PRODUCT_ADVANCE_SETTING = Symbol('UPDATE_PRODUCT_ADVANCE_SETTING');

export const PRODUCT_CHECKOUT_FIELD_UPDATE = Symbol('PRODUCT_CHECKOUT_FIELD_UPDATE');
export const PRODUCT_PAYMENT_FIELD_UPDATE = Symbol('PRODUCT_PAYMENT_FIELD_UPDATE');
export const PRODUCT_BUMPOFFER_FIELD_UPDATE = Symbol('PRODUCT_BUMPOFFER_FIELD_UPDATE');
export const PRODUCT_BOOSTERS_FIELD_UPDATE = Symbol('PRODUCT_BOOSTERS_FIELD_UPDATE');
export const PRODUCT_SETTING_FIELD_UPDATE = Symbol('PRODUCT_SETTING_FIELD_UPDATE');
export const PRODUCT_FULLFILLMENT_FIELD_UPDATE = Symbol('PRODUCT_FULLFILLMENT_FIELD_UPDATE');
export const PRODUCT_THANKYOUPAGE_FIELD_UPDATE = Symbol('PRODUCT_THANKYOUPAGE_FIELD_UPDATE');


export const CREATE_NEW_PRODUCT = Symbol('CREATE_NEW_PRODUCT');
export const PRODUCT_CREATED_SUCCESSFULY = Symbol('PRODUCT_CREATED_SUCCESSFULY');
export const PRODUCT_CREATION_FAILED = Symbol('PRODUCT_CREATION_FAILED');
export const UPDATE_PRODUCT = Symbol('UPDATE_PRODUCT');
export const UPDATE_PRODUCT_SUCCESS = Symbol('UPDATE_PRODUCT_SUCCESS');
export const UPDATE_PRODUCT_FAILED = Symbol('UPDATE_PRODUCT_FAILED');
export const GET_PRODUCT_DETAILS = Symbol('GET_PRODUCT_DETAILS');
export const GET_PRODUCT_SUCCESS = Symbol('GET_PRODUCT_SUCCESS');
export const GET_PRODUCT_FAILED = Symbol('GET_PRODUCT_FAILED');

/* PAYMENT ACTIVATIONS ACTIONS */
export const GET_USER_PAYMENTS_METHODS = Symbol('GET_USER_PAYMENTS_METHODS');
export const ACTIVAT_PAYMENT = Symbol('ACTIVAT_PAYMENT');
export const ACTIVAT_PAYMENT_SUCCESS = Symbol('ACTIVAT_PAYMENT_SUCCESS');
export const ACTIVAT_PAYMENT_FAILED = Symbol('ACTIVAT_PAYMENT_FAILED');
/* ENDS */


/* SETTIGNS ACTIONS - GENERAL SETTING  */

export const UPDATE_MARKETPLACE_SETTINGS = Symbol('UPDATE_MARKETPLACE_SETTINGS');
export const SETTINGS_GENERAL_FIELD_UPDATE = Symbol('SETTINGS_GENERAL_FIELD_UPDATE');

export const SAVE_USER_GENERAL_SETTINGS = Symbol('SAVE_USER_GENERAL_SETTINGS');
export const SAVE_USER_GENERAL_SETTINGS_SUCCESS = Symbol('SAVE_USER_GENERAL_SETTINGS_SUCCESS');
export const SAVE_USER_GENERAL_SETTINGS_FAILED = Symbol('SAVE_USER_GENERAL_SETTINGS_FAILED');

/* SETTIGNS ACTIONS - GENERAL SETTING  ENDS */


/* SETTIGNS ACTIONS - Integrations SETTING  START */
export const CONNECT_WITH_PAYPAL = Symbol('CONNECT_WITH_PAYPAL');
export const CONNECT_WITH_PAYPAL_SUCCESS = Symbol('CONNECT_WITH_PAYPAL_SUCCESS');
export const CONNECT_WITH_PAYPAL_FAILED = Symbol('CONNECT_WITH_PAYPAL_FAILED');

/* SETTIGNS ACTIONS - Integrations SETTING  ENDS */

/* TEAM_MEMBERS SETTING ACTIONS  */
export const GET_MEMBERS_SUCCESS = Symbol('GET_MEMBERS_SUCCESS');
export const CREATE_NEW_MEMBER = Symbol('CREATE_NEW_MEMBER');
export const CREATE_NEW_MEMBER_SUCCESS = Symbol('CREATE_NEW_MEMBER_SUCCESS');
export const CREATE_NEW_MEMBER_FAILED = Symbol('CREATE_NEW_MEMBER_FAILED');

export const ACTIVATE_MEMBER = Symbol('ACTIVATE_MEMBER');
export const ACTIVATE_MEMBER_SUCCESS = Symbol('ACTIVATE_MEMBER_SUCCESS');
export const ACTIVATE_MEMBER_FAILED = Symbol('ACTIVATE_MEMBER_FAILED');
/* TEAM_MEMBERS SETTING ACTIONS ENDS  */


/* Emails SETTING ACTIONS ENDS  */
export const GET_EMAIL_SETTINGS = Symbol('GET_EMAIL_SETTINGS');

export const UPDATE_EMAIL_FOOTER = Symbol('UPDATE_EMAIL_FOOTER');
export const UPDATE_EMAIL_FOOTER_SUCCESS = Symbol('UPDATE_EMAIL_FOOTER_SUCCESS');
export const UPDATE_EMAIL_FOOTER_FAILED = Symbol('UPDATE_EMAIL_FOOTER_FAILED');

export const VERIFY_SOURCE_EMAIL = Symbol('VERIFY_SOURCE_EMAIL');
export const VERIFY_SOURCE_EMAIL_SUCCESS = Symbol('VERIFY_SOURCE_EMAIL_SUCCESS');
export const VERIFY_SOURCE_EMAIL_FAILED = Symbol('VERIFY_SOURCE_EMAIL_FAILED');

export const TEST_EMAIL = Symbol('TEST_EMAIL');
export const TEST_EMAIL_SUCCESS = Symbol('TEST_EMAIL_SUCCESS');
export const TEST_EMAIL_FAILED = Symbol('TEST_EMAIL_FAILED');

export const CHECK_EMAIL_VERIFICATION = Symbol('CHECK_EMAIL_VERIFICATION');
export const CHECK_EMAIL_VERIFICATION_SUCCESS = Symbol('CHECK_EMAIL_VERIFICATION_SUCCESS');
export const CHECK_EMAIL_VERIFICATION_FAILED = Symbol('CHECK_EMAIL_VERIFICATION_FAILED');

export const testEmailTypes = {
  order_receipt: 'ORDER_RECEIPT',
  refund_order: 'REFUND_ORDER',
  cancel_subscription: 'CANCEL_SUBSCRIPTION',
  refund_subscription: 'REFUND_SUBSCRIPTION',
  subscription_charge_receipt: 'SUBSCRIPTION_CHARGE_RECEIPT',
  default_dunning: 'DEFAULT_DUNNING',
  dunning_1: 'DUNNING_1',
  dunning_2: 'DUNNING_2',
  dunning_3: 'DUNNING_3',
  dunning_4: 'DUNNING_4'
};
/* Emails SETTING ACTIONS ENDS  */


/* AGENCY ACTIONS  */
export const GET_SUB_ACCOUNTS = Symbol('GET_SUB_ACCOUNTS');
export const CREATE_SUB_ACCOUNT = Symbol('CREATE_SUB_ACCOUNT');
export const CREATE_SUB_ACCOUNT_SUCCESS = Symbol('CREATE_SUB_ACCOUNT_SUCCESS');
export const CREATE_SUB_ACCOUNT_FAILED = Symbol('CREATE_SUB_ACCOUNT_FAILED');
/* AGENCY ACTIONS ENDS */

export const CREATE_NEW_COUPON = Symbol('CREATE_NEW_COUPON');
export const CREATE_NEW_COUPON_SUCCESS = Symbol('CREATE_NEW_COUPON_SUCCESS');
export const CREATE_NEW_COUPON_FAILED = Symbol('CREATE_NEW_COUPON_FAILED');
export const GET_COUPONS_LIST = Symbol('GET_COUPONS_LIST');

export const RESET_COUPON_MODALE = Symbol('RESET_COUPON_MODALE');

export const CHANGE_COUPON_STATE = Symbol('CHANGE_COUPON_STATE');
export const CHANGE_COUPON_STATE_SUCCESS = Symbol('CHANGE_COUPON_STATE_SUCCESS');
export const CHANGE_COUPON_STATE_FAILED = Symbol('CHANGE_COUPON_STATE_FAILED');

/* ACCOUNT SETTING ACTIONS */
// ACCOUNT IMAGE
export const UPDATE_USER_PROFILE_IMAGE = Symbol('UPDATE_USER_PROFILE_IMAGE');
export const UPDATE_USER_PROFILE_IMAGE_SUCCESS = Symbol('UPDATE_USER_PROFILE_IMAGE_SUCCESS');
export const UPDATE_USER_PROFILE_IMAGE_FAILED = Symbol('UPDATE_USER_PROFILE_IMAGE_FAILED');


export const CHANGE_ACCOUNT_DETAILS = Symbol('CHANGE_ACCOUNT_DETAILS');
export const CHANGE_ACCOUNT_DETAILS_SUCCESS = Symbol('CHANGE_ACCOUNT_DETAILS_SUCCESS');
export const CHANGE_ACCOUNT_DETAILS_FAILED = Symbol('CHANGE_ACCOUNT_DETAILS_FAILED');
export const CHANGE_ACCOUNT_PASSWORD = Symbol('CHANGE_ACCOUNT_PASSWORD');
export const CHANGE_ACCOUNT_PASSWORD_SUCCESS = Symbol('CHANGE_ACCOUNT_PASSWORD_SUCCESS');
export const CHANGE_ACCOUNT_PASSWORD_FAILED = Symbol('CHANGE_ACCOUNT_PASSWORD_FAILED');

/* ACCOUNT SETTING ACTIONS ENDS */
export const GET_USER_PRODUCTS = Symbol('GET_USER_PRODUCTS');
export const GET_USER_PRODUCTS_SUCCESS = Symbol('GET_USER_PRODUCTS_SUCCESS');
export const GET_USER_PRODUCTS_FAILED = Symbol('GET_USER_PRODUCTS_FAILED');

export const DELETE_USER_PRODUCT = Symbol('DELETE_USER_PRODUCT');
export const DELETE_USER_PRODUCT_SUCCESS = Symbol('DELETE_USER_PRODUCT_SUCCESS');
export const DELETE_USER_PRODUCT_FAILED = Symbol('DELETE_USER_PRODUCT_FAILED');

export const TOGGLE_PRODUCT_AVAILABILITY = Symbol('TOGGLE_PRODUCT_AVAILABILITY');
export const TOGGLE_PRODUCT_AVAILABILITY_SUCCESS = Symbol('TOGGLE_PRODUCT_AVAILABILITY_SUCCESS');
export const TOGGLE_PRODUCT_AVAILABILITY_FAILED = Symbol('TOGGLE_PRODUCT_AVAILABILITY_FAILED');
/* Product action types end */


export const ADD_PRODUCT_PAYMENT_METHOD = Symbol('ADD_PRODUCT_PAYMENT_METHOD');
export const ADD_PRODUCT_PAYMENT_METHOD_SUCCESS = Symbol('ADD_PRODUCT_PAYMENT_METHOD_SUCCESS');
export const ADD_PRODUCT_PAYMENT_METHOD_FAILED = Symbol('ADD_PRODUCT_PAYMENT_METHOD_FAILED');

/* files uploading actions  */
export const DELETE_FILE = Symbol('DELETE_FILE');
export const UPLOAD_FILE = Symbol('UPLOAD_FILE');
export const UPLOAD_FILE_SUCCESS = Symbol('UPLOAD_FILE_SUCCESS');
export const UPLOAD_FILE_FAILED = Symbol('UPLOAD_FILE_FAILED');
/* files uploading actions ends */


export const GET_ACTIVITIES = Symbol('GET_ACTIVITIES');
export const GET_CUSTOMERS = Symbol('GET_CUSTOMERS');
export const GET_ORDERS_LIST = Symbol('GET_ORDERS_LIST');
export const GET_SUBSCRIPTIONS_LIST = Symbol('GET_SUBSCRIPTIONS_LIST');

/* Upsells Actions */
export const GET_UPSELLS = Symbol('GET_UPSELLS');
export const GET_UPSELLS_SUCCESS = Symbol('GET_UPSELLS_SUCCESS');
export const GET_UPSELLS_FAILED = Symbol('GET_UPSELLS_FAILED');
export const CREATE_UPSELL = Symbol('CREATE_UPSELL');
export const CREATE_UPSELL_SUCCESS = Symbol('CREATE_UPSELL_SUCCESS');
export const CREATE_UPSELL_FAILED = Symbol('CREATE_UPSELL_FAILED');
export const UPDATE_UPSELL = Symbol('UPDATE_UPSELL');
export const UPDATE_UPSELL_SUCCESS = Symbol('UPDATE_UPSELL_SUCCESS');
export const UPDATE_UPSELL_FAILED = Symbol('UPDATE_UPSELL_FAILED');
export const DELETE_UPSELL = Symbol('DELETE_UPSELL');
export const DELETE_UPSELL_SUCCESS = Symbol('DELETE_UPSELL_SUCCESS');
export const DELETE_UPSELL_FAILED = Symbol('DELETE_UPSELL_FAIL');
export const CHANGE_UPSELL_STATE = Symbol('CHANGE_UPSELL_STATE');
export const CHANGE_UPSELL_STATE_SUCCESS = Symbol('CHANGE_UPSELL_STATE_SUCCESS');
export const CHANGE_UPSELL_STATE_FAILED = Symbol('CHANGE_UPSELL_STATE_FAILED');

/* Upsells Actions Ends */

/* Fulfillment Actions  */

export const GET_FULFILLMENT = Symbol('  GET_FULFILLMENT');
export const GET_FULFILLMENT_SUCCESS = Symbol('  GET_FULFILLMENT_SUCCESS');
export const GET_FULFILLMENT_FAILED = Symbol('  GET_FULFILLMENT_FAILED');
export const CREATE_FULFILLMENT = Symbol('  CREATE_FULFILLMENT');
export const CREATE_FULFILLMENT_SUCCESS = Symbol('  CREATE_FULFILLMENT_SUCCESS');
export const CREATE_FULFILLMENT_FAILED = Symbol('  CREATE_FULFILLMENT_FAILED');
export const UPDATE_FULFILLMENT = Symbol('  UPDATE_FULFILLMENT');
export const UPDATE_FULFILLMENT_SUCCESS = Symbol('  UPDATE_FULFILLMENT_SUCCESS');
export const UPDATE_FULFILLMENT_FAILED = Symbol('  UPDATE_FULFILLMENT_FAILED');
export const DELETE_FULFILLMENT = Symbol('  DELETE_FULFILLMENT');
export const DELETE_FULFILLMENT_SUCCESS = Symbol('  DELETE_FULFILLMENT_SUCCESS');
export const DELETE_FULFILLMENT_FAILED = Symbol('  DELETE_FULFILLMENT_FAILED');
export const CHANGE_FULFILLMENT_STATE = Symbol('  CHANGE_FULFILLMENT_STATE');
export const CHANGE_FULFILLMENT_STATE_SUCCESS = Symbol('  CHANGE_FULFILLMENT_STATE_SUCCESS');
export const CHANGE_FULFILLMENT_STATE_FAILED = Symbol('  CHANGE_FULFILLMENT_STATE_FAILED');

/* Fulfillment Actions Ends */


/* global action types */
export const TOGGLE_CREATE_PRODUCT_MODALE = Symbol('TOGGLE_CREATE_PRODUCT_MODALE');

export const APP_INITIATION = Symbol('APP_INITIATION');
export const START_LOADING = Symbol('START_LOADING');
export const END_LOADING = Symbol('END_LOADING');

export const API_REQUEST = Symbol('API_REQUEST');

export const SHOW_FLASH_MESSAGE = Symbol('SHOW_FLASH_MESSAGE');
export const HIDE_FLASH_MESSAGE = Symbol('HIDE_FLASH_MESSAGE');



export const APP_INIT = Symbol('APP_INIT');
export const APP_LAUNCH_SUCCESS = Symbol('APP_LAUNCH_SUCCESS');
export const APP_LAUNCH_FAILD = Symbol('APP_LAUNCH_FAILD');

export const SIGN_UP = Symbol('SIGN_UP');
export const SIGN_UP_SUCCESS = Symbol('SIGN_UP_SUCCESS');
export const SIGN_UP_FAILD = Symbol('SIGN_UP_FAILD');


export const LOGIN = Symbol('LOGIN');
export const LOGIN_SUCCESS = Symbol('LOGIN_SUCCESS');
export const LOGIN_FAILD = Symbol('LOGIN_FAILD');

export const LOGOUT = Symbol('LOGOUT');


export const SIGN_UP_INVALID_FIELDS = Symbol('SIGN_UP_INVALID_FIELDS');
export const LOGIN_INVALID_FIELDS = Symbol('LOGIN_INVALID_FIELDS');

/* PROMO CODE ACTIONS */

/* AGENCY CODE */
export const ACTIVATE_AGENCY_CODE = Symbol('ACTIVATE_AGENCY_CODE');
export const ACTIVATE_AGENCY_CODE_SUCCESS = Symbol('ACTIVATE_AGENCY_CODE_SUCCESS');
export const ACTIVATE_AGENCY_CODE_FAILD = Symbol('ACTIVATE_AGENCY_CODE_FAILD');

/* AGENCY CODE ENDS */

/* PromoCode actions types */
export const PROMO_CODE_ACTIVATE = Symbol('PROMO_CODE_ACTIVATE');
export const PROMO_CODE_ACTIVATE_SUCCESS = Symbol('PROMO_CODE_ACTIVATE_SUCCESS');
export const PROMO_CODE_ACTIVATE_FAILD = Symbol('PROMO_CODE_ACTIVATE_FAILD');
/* PromoCode actions types ends */

/* Product action types */
export const NEW_PRODUCT_INVALID_FORM = Symbol('NEW_PRODUCT_INVALID_FORM');
export const NEW_PRODUCT_FIELD_UPDATE = Symbol('NEW_PRODUCT_FIELD_UPDATE');

export const PRODUCT_DETAILS_FIELD_UPDATE = Symbol('PRODUCT_DETAILS_FIELD_UPDATE');

export const UPDATE_PRODUCT_DETAILS = Symbol('UPDATE_PRODUCT_DETAILS');
export const UPDATE_PRODUCT_DETAILS_SUCCESS = Symbol('UPDATE_PRODUCT_DETAILS_SUCCESS');
export const UPDATE_PRODUCT_DETAILS_FAILD = Symbol('UPDATE_PRODUCT_DETAILS_FAILD');

export const UPDATE_PRODUCT_CHECKOUT_TEMPLATE = Symbol('UPDATE_PRODUCT_CHECKOUT_TEMPLATE');
export const UPDATE_PRODUCT_CHECKOUT_TEMPLATE_SUCCESS = Symbol('UPDATE_PRODUCT_CHECKOUT_TEMPLATE_SUCCESS');
export const UPDATE_PRODUCT_CHECKOUT_TEMPLATE_FAILD = Symbol('UPDATE_PRODUCT_CHECKOUT_TEMPLATE_FAILD');

export const UPDATE_PRODUCT_PAYMENT_METHOD = Symbol('UPDATE_PRODUCT_PAYMENT_METHOD');
export const UPDATE_PRODUCT_BUMP_SETTING = Symbol('UPDATE_PRODUCT_BUMP_SETTING');
export const UPDATE_PRODUCT_ADVANCE_SETTING = Symbol('UPDATE_PRODUCT_ADVANCE_SETTING');

export const PRODUCT_CHECKOUT_FIELD_UPDATE = Symbol('PRODUCT_CHECKOUT_FIELD_UPDATE');
export const PRODUCT_PAYMENT_FIELD_UPDATE = Symbol('PRODUCT_PAYMENT_FIELD_UPDATE');
export const PRODUCT_BUMP_FIELD_UPDATE = Symbol('PRODUCT_BUMP_FIELD_UPDATE');
export const PRODUCT_SETTING_FIELD_UPDATE = Symbol('PRODUCT_SETTING_FIELD_UPDATE');


export const CREATE_NEW_PRODUCT = Symbol('CREATE_NEW_PRODUCT');
export const PRODUCT_CREATED_SUCCESSFULY = Symbol('PRODUCT_CREATED_SUCCESSFULY');
export const PRODUCT_CREATION_FAILD = Symbol('PRODUCT_CREATION_FAILD');
export const UPDATE_PRODUCT = Symbol('UPDATE_PRODUCT');
export const UPDATE_PRODUCT_SUCCESS = Symbol('UPDATE_PRODUCT_SUCCESS');
export const UPDATE_PRODUCT_FAILD = Symbol('UPDATE_PRODUCT_FAILD');
export const GET_PRODUCT_DETAILS = Symbol('GET_PRODUCT_DETAILS');
export const GET_PRODUCT_SUCCESS = Symbol('GET_PRODUCT_SUCCESS');
export const GET_PRODUCT_FAILD = Symbol('GET_PRODUCT_FAILD');

/* PAYMENT ACTIVATIONS ACTIONS */
export const GET_USER_PAYMENTS_METHODS = Symbol('GET_USER_PAYMENTS_METHODS');
export const ACTIVAT_PAYMENT = Symbol('ACTIVAT_PAYMENT');
export const ACTIVAT_PAYMENT_SUCCESS = Symbol('ACTIVAT_PAYMENT_SUCCESS');
export const ACTIVAT_PAYMENT_FAILD = Symbol('ACTIVAT_PAYMENT_FAILD');
/* ENDS */


/* SETTIGNS ACTIONS - GENERAL SETTING  */
export const SETTINGS_GENERAL_FIELD_UPDATE = Symbol('SETTINGS_GENERAL_FIELD_UPDATE');

export const SAVE_USER_GENERAL_SETTINGS = Symbol('SAVE_USER_GENERAL_SETTINGS');
export const SAVE_USER_GENERAL_SETTINGS_SUCCESS = Symbol('SAVE_USER_GENERAL_SETTINGS_SUCCESS');
export const SAVE_USER_GENERAL_SETTINGS_FAILD = Symbol('SAVE_USER_GENERAL_SETTINGS_FAILD');
/* SETTIGNS ACTIONS - GENERAL SETTING  ENDS */

/* TEAM_MEMBERS SETTING ACTIONS  */
export const GET_MEMBERS_SUCCESS = Symbol('GET_MEMBERS_SUCCESS');
export const CREATE_NEW_MEMBER = Symbol('CREATE_NEW_MEMBER');
export const CREATE_NEW_MEMBER_SUCCESS = Symbol('CREATE_NEW_MEMBER_SUCCESS');
export const CREATE_NEW_MEMBER_FAILD = Symbol('CREATE_NEW_MEMBER_FAILD');

export const ACTIVATE_MEMBER = Symbol('ACTIVATE_MEMBER');
export const ACTIVATE_MEMBER_SUCCESS = Symbol('ACTIVATE_MEMBER_SUCCESS');
export const ACTIVATE_MEMBER_FAILD = Symbol('ACTIVATE_MEMBER_FAILD');
/* TEAM_MEMBERS SETTING ACTIONS ENDS  */


/* AGENCY ACTIONS  */
export const GET_SUB_ACCOUNTS = Symbol('GET_SUB_ACCOUNTS');
export const CREATE_SUB_ACCOUNT = Symbol('CREATE_SUB_ACCOUNT');
export const CREATE_SUB_ACCOUNT_SUCCESS = Symbol('CREATE_SUB_ACCOUNT_SUCCESS');
export const CREATE_SUB_ACCOUNT_FAILD = Symbol('CREATE_SUB_ACCOUNT_FAILD');
/* AGENCY ACTIONS ENDS */

export const CREATE_NEW_COUPON = Symbol('CREATE_NEW_COUPON');
export const CREATE_NEW_COUPON_SUCCESS = Symbol('CREATE_NEW_COUPON_SUCCESS');
export const CREATE_NEW_COUPON_FAILD = Symbol('CREATE_NEW_COUPON_FAILD');
export const GET_COUPONS_LIST = Symbol('GET_COUPONS_LIST');

/* ACCOUNT SETTING ACTIONS */
// ACCOUNT IMAGE
export const UPDATE_USER_PROFILE_IMAGE = Symbol('UPDATE_USER_PROFILE_IMAGE');
export const UPDATE_USER_PROFILE_IMAGE_SUCCESS = Symbol('UPDATE_USER_PROFILE_IMAGE_SUCCESS');
export const UPDATE_USER_PROFILE_IMAGE_FAILD = Symbol('UPDATE_USER_PROFILE_IMAGE_FAILD');


export const CHANGE_ACCOUNT_DETAILS = Symbol('CHANGE_ACCOUNT_DETAILS');
export const CHANGE_ACCOUNT_DETAILS_SUCCESS = Symbol('CHANGE_ACCOUNT_DETAILS_SUCCESS');
export const CHANGE_ACCOUNT_DETAILS_FAILD = Symbol('CHANGE_ACCOUNT_DETAILS_FAILD');
export const CHANGE_ACCOUNT_PASSWORD = Symbol('CHANGE_ACCOUNT_PASSWORD');
export const CHANGE_ACCOUNT_PASSWORD_SUCCESS = Symbol('CHANGE_ACCOUNT_PASSWORD_SUCCESS');
export const CHANGE_ACCOUNT_PASSWORD_FAILD = Symbol('CHANGE_ACCOUNT_PASSWORD_FAILD');

/* ACCOUNT SETTING ACTIONS ENDS */
export const GET_USER_PRODUCTS = Symbol('GET_USER_PRODUCTS');
export const GET_USER_PRODUCTS_SUCCESS = Symbol('GET_USER_PRODUCTS_SUCCESS');
export const GET_USER_PRODUCTS_FAILD = Symbol('GET_USER_PRODUCTS_FAILD');

export const DELETE_USER_PRODUCT = Symbol('DELETE_USER_PRODUCT');
export const DELETE_USER_PRODUCT_SUCCESS = Symbol('DELETE_USER_PRODUCT_SUCCESS');
export const DELETE_USER_PRODUCT_FAILD = Symbol('DELETE_USER_PRODUCT_FAILD');

export const TOGGLE_PRODUCT_AVAILABILITY = Symbol('TOGGLE_PRODUCT_AVAILABILITY');
export const TOGGLE_PRODUCT_AVAILABILITY_SUCCESS = Symbol('TOGGLE_PRODUCT_AVAILABILITY_SUCCESS');
export const TOGGLE_PRODUCT_AVAILABILITY_FAILD = Symbol('TOGGLE_PRODUCT_AVAILABILITY_FAILD');
/* Product action types end */


export const ADD_PRODUCT_PAYMENT_METHOD = Symbol('ADD_PRODUCT_PAYMENT_METHOD');
export const ADD_PRODUCT_PAYMENT_METHOD_SUCCESS = Symbol('ADD_PRODUCT_PAYMENT_METHOD_SUCCESS');
export const ADD_PRODUCT_PAYMENT_METHOD_FAILD = Symbol('ADD_PRODUCT_PAYMENT_METHOD_FAILD');

/* files uploading actions  */
export const DELETE_FILE = Symbol('DELETE_FILE');
export const UPLOAD_FILE = Symbol('UPLOAD_FILE');
export const UPLOAD_FILE_SUCCESS = Symbol('UPLOAD_FILE_SUCCESS');
export const UPLOAD_FILE_FAILD = Symbol('UPLOAD_FILE_FAILD');
/* files uploading actions ends */


export const GET_CUSTOMERS_LIST = Symbol('GET_CUSTOMERS_LIST');
export const GET_ORDERS_LIST = Symbol('GET_ORDERS_LIST');
export const GET_SUBSCRIPTIONS_LIST = Symbol('GET_SUBSCRIPTIONS_LIST');


/* global action types */
export const TOGGLE_CREATE_PRODUCT_MODALE = Symbol('TOGGLE_CREATE_PRODUCT_MODALE');

export const APP_INITIATION = Symbol('APP_INITIATION');
export const TOGGLE_LOADING = Symbol('TOGGLE_LOADING');

export const API_REQUEST = Symbol('API_REQUEST');

export const SHOW_FLASH_MESSAGE = Symbol('SHOW_FLASH_MESSAGE');
export const HIDE_FLASH_MESSAGE = Symbol('HIDE_FLASH_MESSAGE');


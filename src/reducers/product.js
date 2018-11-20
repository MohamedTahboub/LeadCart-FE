import {
  NEW_PRODUCT_FIELD_UPDATE,
  PRODUCT_CREATED_SUCCESSFULY,
  PRODUCT_DETAILS_FIELD_UPDATE,
  PRODUCT_CHECKOUT_FIELD_UPDATE,
  PRODUCT_PAYMENT_FIELD_UPDATE,
  PRODUCT_BUMP_FIELD_UPDATE,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_FAILD,
  PRODUCT_SETTING_FIELD_UPDATE,
  TOGGLE_PRODUCT_AVAILABILITY_SUCCESS
} from 'constantsTypes';


const initState = {
  id: '',
  isAproductCreated: false,
  newProductHolder: {},
  details: {
    errors: {}
  },
  checkout: {
    template: 'x',
    presetColors: 'default',
    errors: {},
  },
  payment: {
    type: 'stripe'
  },
  bumbOffer: {
    enable: false,
    options: {
      name: '',
      price: '',
      title: '',
      introText: '',
      bodytext: ''
    },
    fullfillment: {
      successUrl: ''
    },
    errors: {}
  },
  setting: {
    scripts: {
      footerEmbeded: '',
      firePixels: ''
    },
    notificationPostPurchaseUrl: '',
    checkoutPageRedirect: '',
    closeCheckoutAfterPurchases: false,
    closeCheckoutAfterDate: false,
    errors: {}
  },
  errors: {}
};
export default (state = initState, { type, payload }) => {
  switch (type) {
  case PRODUCT_CREATED_SUCCESSFULY: return {
    ...state, details: { ...state.details, ...payload }, isAproductCreated: !state.isAproductCreated, newProductHolder: {}
  };
  case NEW_PRODUCT_FIELD_UPDATE: return { ...state, newProductHolder: { ...state.newProductHolder, [payload.name]: payload.value } };
  case PRODUCT_DETAILS_FIELD_UPDATE: return { ...state, details: { ...state.details, [payload.name]: payload.value } };
  case PRODUCT_CHECKOUT_FIELD_UPDATE: return { ...state, checkout: { ...state.checkout, [payload.name]: payload.value } };
  case PRODUCT_PAYMENT_FIELD_UPDATE: return { ...state, payment: { ...state.payment, [payload.name]: payload.value } };
  case PRODUCT_BUMP_FIELD_UPDATE: return { ...state, bumbOffer: { ...state.bumbOffer, [payload.name]: payload.value } };
  case PRODUCT_SETTING_FIELD_UPDATE: return { ...state, setting: { ...state.setting, [payload.name]: payload.value } };

  case GET_PRODUCT_SUCCESS: return {
    ...state,
    _id: payload._id,
    checkout: payload.checkoutPage,
    details: payload,
    payment: payload.payment
  };
  case GET_PRODUCT_FAILD: return { ...state, errors: payload };
  case TOGGLE_PRODUCT_AVAILABILITY_SUCCESS:
    return { ...state, details: { ...state.details, available: !state.details.available } };
  default: return state;
  }
};

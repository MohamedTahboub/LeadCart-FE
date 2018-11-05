import {
  NEW_PRODUCT_FIELD_UPDATE,
  PRODUCT_CREATED_SUCCESSFULY,
  PRODUCT_DETAILS_FIELD_UPDATE,
  PRODUCT_CHECKOUT_FIELD_UPDATE,
  PRODUCT_PAYMENT_FIELD_UPDATE,
  PRODUCT_BUMP_FIELD_UPDATE,
  PRODUCT_SETTING_FIELD_UPDATE
} from 'constantsTypes';


const initState = {
  id: '',
  isAproductCreated: false,
  newProductHolder: {},
  details: {
    errors: {}
  },
  checkout: {
    template: 1,
    presentColors: '',
    MarketPlaceLogoUri: '',
    guaranteeTitle: '',
    guranteeText: '',
    bulletPointsTitle: '',
    bulletPoints: [],
    bulletPointImage: '',
    testimonials: [{
      value: '', image: ''
    }],
    customContent: '',
    termsAndConditions: false,
    termsAndConditionsUrl: '',
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
  }
};
export default (state = initState, { type, payload }) => {
  switch (type) {
  case PRODUCT_CREATED_SUCCESSFULY: return {
 ...state, details: { ...state.details, ...payload }, isAproductCreated: true, newProductHolder: {} 
};
  case NEW_PRODUCT_FIELD_UPDATE: return { ...state, newProductHolder: { ...state.newProductHolder, [payload.name]: payload.value } };
  case PRODUCT_DETAILS_FIELD_UPDATE: return { details: { ...state.details, [payload.name]: payload.value } };
  case PRODUCT_CHECKOUT_FIELD_UPDATE: return { checkout: { ...state.checkout, [payload.name]: payload.value } };
  case PRODUCT_PAYMENT_FIELD_UPDATE: return { payment: { ...state.payment, [payload.name]: payload.value } };
  case PRODUCT_BUMP_FIELD_UPDATE: return { bumbOffer: { ...state.bumbOffer, [payload.name]: payload.value } };
  case PRODUCT_SETTING_FIELD_UPDATE: return { setting: { ...state.setting, [payload.name]: payload.value } };
  default: return state;
  }
};

import { CREATE_NEW_PRODUCT } from 'constantsTypes';


const initState = {
  id: '',
  details: {
    name: '',
    internalName: '',
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
  advance: {
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
  case CREATE_NEW_PRODUCT: return { ...state, details: payload };
  default: return state;
  }
};

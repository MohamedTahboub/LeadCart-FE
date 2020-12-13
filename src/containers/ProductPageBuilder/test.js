const importantProps = {
  name:  '',
  coupons: {},
  enabled: false,
  list: [],
  custom: {},
  billingAddress: false,
  couponSection: false,
  marketingConsent: false,
  marketingConsentIsRequired: false,
  orderSummary: false,
  shippingDetails: true,
  shippingMethodsEnabled: false,
  termsAndConditions: false,
  termsAndConditionsIsRequired: false,
  pageStyles: {},
  layout: '',
  pageBackgroundSettings: {},
  firstSectionBackground: {},
  backgroundImage: '',
  backgroundType: '',
  productPage: {},
  backgroundColor: '',
  firstColumn: {},
  secondColumn: {},
  width: '',
  marginTop: '',
  showHead: false,
  payment: {},
  methods: [],
  recurringPeriod: '',
  type: '',
  price: {},
  amount: 0,
  currency: '',
  format: '',
  pricingOptions: [],
  shippingMethods: [],
  tags: []

  // sections: []
};


// export const hasChanges = (oldObj = {}, newObj = {}) => {
//   const checkPropsWithRef = (oldObj, newObj) => {
//     if (Array.isArray(oldObj) && oldObj?.length === newObj?.length) {
//       const hasObjects = Boolean(oldObj.filter((ele) => typeof ele === 'object').length);
//       if (hasObjects) {
//         return Boolean(oldObj.find((ele, i) => hasChanges(oldObj[i], newObj[i])));
//       } else {
//         const res = JSON.stringify(oldObj.sort()) !== JSON.stringify(newObj.sort());
//         if (res) return true;
//       }

//     } else if (Array.isArray(oldObj) && oldObj?.length !== newObj?.length) {
//       return true;
//     } else {
//       return hasChanges(oldObj, newObj);
//     }
//   };


//   for (const prop in newObj)
//     if (!oldObj.hasOwnProperty(prop) && Boolean(newObj[prop])) return true;

//   for (const prop in oldObj) {
//     if (importantProps.hasOwnProperty(prop) && newObj.hasOwnProperty(prop)) {
//       if (typeof oldObj[prop] === 'object' && oldObj[prop] !== null) {
//         if (checkPropsWithRef(oldObj[prop], newObj[prop]))
//           return checkPropsWithRef(oldObj[prop], newObj[prop]);

//       } else if (!Object.is(oldObj[prop], newObj[prop])) {
//         return true;
//       }
//     }
//   }


//   return false;
// };


export const hasChanges = (oldObj = {}, newObj = {}) => oldObj?.name !== newObj?.name;

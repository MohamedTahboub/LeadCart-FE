import * as yup from 'yup';
import castYupErrors from './castErrors';


const sectionSchema = yup.mixed().transform((section = {}) => {
  if (section._id) {
    const { _id, ...sectionRemains } = section;
    sectionRemains.id = _id;
    return sectionRemains;
  }
  return section;
});

const paymentPriceSubSchema = {
  type: yup.string().default('Onetime'),
  recurringPeriod: yup.string().when('type', {
    is: 'Onetime',
    then: yup.string().transform(() => undefined),
    otherwise: yup.string().default('MONTH')
  }),
  splits: yup.string().when('type', {
    is: 'Split',
    then: yup.string().default('3'),
    otherwise: yup.string().transform(() => undefined)
  })
};
const pricingOptionSchema = yup.object({
  id: yup.string().required(),
  label: yup.string().required(),
  amount: yup.number().required(),
  ...paymentPriceSubSchema
});

const shippingMethodsSchema = yup.object({
  id: yup.string().required(),
  name: yup.string().default('Untitled shipping method'),
  cost: yup.number().default(0),
  logo: yup.string()
});

const ProductSchema = yup.object({
  name: yup.string().default('Product-Name'),
  category: yup.string().default('checkout'),
  custom: yup.object({
    declineButtonText: yup.string(),
    orderButtonText: yup.string(),
    shippingDetails: yup.boolean().default(false),
    couponSection: yup.boolean().default(false),
    orderSummary: yup.boolean().default(false),
    billingAddress: yup.boolean().default(false),
    marketingConsent: yup.boolean().default(false),
    marketingConsentIsRequired: yup.boolean().default(false),
    termsAndConditions: yup.boolean().default(false),
    termsAndConditionsIsRequired: yup.boolean().default(false),
    shippingMethodsEnabled: yup.boolean().default(false)
  }),
  internalName: yup.string(),
  shippingMethods: yup.array().of(shippingMethodsSchema),
  thumbnail: yup.string(),
  available: yup.boolean().default(false),
  price: yup.object({
    amount: yup.number().required(),
    currency: yup.string().default('USD'),
    format: yup.string().default('amount')
  }).required(),
  payment: yup.object({
    methods: yup.array().of(yup.string()),
    ...paymentPriceSubSchema
  }),
  pricingOptions: yup.array().of(pricingOptionSchema),
  fulfillment: yup.string(),
  coupons: yup.object({ enabled: yup.bool().transform((val) => !!val) }),
  shippingDetails: yup.object({ enabled: yup.bool() }),
  settings: yup.object({ language: yup.string() }),
  sections: yup.array().of(sectionSchema),
  pageStyles: yup.mixed(),
  scripts: yup.object({
    fbPixelId: yup
      .string()
      .min(9, 'Facebook Pixels must be at least 9 characters')
      .max(20, 'Facebook Pixels must be at most 20 characters'),
    googleTagManager: yup
      .string(),
    scriptTag: yup
      .string()
      .transform((val) => val || undefined),
    t_fbPixelId: yup
      .string(),
    t_googleTagManager: yup
      .string(),
    t_scriptTag: yup
      .string()
  })
});


export default async (product) => {
  try {
    const castedProduct = await ProductSchema.validateSync(product, { abortEarly: false, stripUnknown: true });
    return {
      isValid: true,
      value: castedProduct
    };
  } catch (err) {
    console.log(err);
    return {
      isValid: false,
      errList: err?.errors || [],
      errors: castYupErrors(err)
    };
  }
};

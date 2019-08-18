import * as yup from 'yup';
import ids from 'shortid';
import defaultLogo from 'assets/images/new-product-icon.png';
import castYupErrors from './castErrors';

const defaultGuaranteeImage = 'https://s3.us-east-2.amazonaws.com/static.leadcart.io/5d3bd34e97d3ea503e8659af/products/guarantee-badge.png';

const featuresSchema = yup.object({
  enabled: yup.boolean().default(false),
  title: yup.string().default('Features List'),
  list: yup.array().of(yup.object({
    text: yup.string().required()
  }))
});
const termsAndConditionsSchema = yup.object({
  enabled: yup.boolean().default(false),
  url: yup.string().default(' ')
});

const testimonialsSchema = yup.object({
  enabled: yup.boolean().default(false),
  title: yup.string().default('Testimonials List'),
  list: yup.array().of(yup.object({
    author: yup.string().required(),
    image: yup.string().required(),
    content: yup.string().required()
  }))
});


const checkoutPageSchema = yup.object({
  template: yup.string().default('temp1'),
  checkoutButtonText: yup.string().default('Complete Order'),
  presetColors: yup.string().default('#8ED1FC'),
  features: featuresSchema,
  guaranteed: yup.object({
    enabled: yup.bool().default(false),
    url: yup.string().url().default(defaultGuaranteeImage)
  }),
  logo: yup.string().default(defaultLogo),
  termsAndConditions: termsAndConditionsSchema,
  testimonials: testimonialsSchema,
});


const offerSchema = yup.object({
  enabled: yup.boolean().default(false),
  bodyText: yup.string().default('offer description goes here,edit it'),
  introText: yup.string().default('offer main label goes here,edit it'),
  name: yup.string().default('Offer Name'),
  title: yup.string().default('offer title goes here,edit it'),
  fulfillment: yup.string(),
  price: yup.number().default(0),
  style: yup.object({
    containerBackground: yup.string(),
    containerTextColor: yup.string(),
    headerBackground: yup.string(),
    headerTextColor: yup.string(),
    borderColor: yup.string(),
    borderStyle: yup.string(),
    borderWidth: yup.string(),
    borderRadius: yup.string()
  })
}).required();

const ProductSchema = yup.object({
  available: yup.boolean().default(false),
  checkoutPage: checkoutPageSchema,
  offer: offerSchema,
  name: yup.string().default('Product-Name'),
  image: yup.string(),
  internalName: yup.string(),
  url: yup.string().default(() => ids.generate()),
  description: yup.string(),
  price: yup.object({
    amount: yup.number().required(),
    currency: yup.string().default('USD')
  }).required(),
  payment: yup.object({
    methods: yup.array().of(yup.string()),
    type: yup.string(),
    recurringPeriod: yup.string().when('type',
      {
        is: 'Subscription',
        then: yup.string().default('MONTH'),
        otherwise: yup.string().transform(() => undefined)
      }),
    splits: yup.string().when('type',
      {
        is: 'Split',
        then: yup.string().default('3'),
        otherwise: yup.string().transform(() => undefined),
      })
  }),
  fulfillment: yup.string(),
  coupons: yup.object({
    enabled: yup.bool().transform((val) => !!val),
  }),
  shippingDetails: yup.object({
    enabled: yup.bool()
  }),
  scripts: yup.object({
    fbPixelId: yup
      .string()
      .min(9)
      .max(20),
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
      .string(),
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
    return {
      isValid: false,
      errors: castYupErrors(err)
    };
  }
};


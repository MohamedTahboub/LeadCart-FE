import * as yup from 'yup';
import castYupErrors from './castErrors';
import ids from 'shortid';
import defaultLogo from 'assets/images/new-product-icon.png'

const featuresSchema = yup.object({
  enabled: yup.boolean().default(false),
  title: yup.string().default('Features List'),
  list: yup.array().of(yup.object({
    text: yup.string().required()
  }))
});
const termsAndConditionsSchema = yup.object({
  enabled: yup.boolean().default(false),
  url: yup.string().url()
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
  guaranteed: yup.boolean().default(false),
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
  price: yup.number().default(0)
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
  scripts: yup.object({
    fbPixelId: yup
      .number()
      .test('len', 'Must be between 9 to 20 characters', (val = '') => val.toString().length >= 9 && val.toString().length <= 20)
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


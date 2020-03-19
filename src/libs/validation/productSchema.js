import * as yup from 'yup';
// import ids from 'shortid';
import defaultLogo from 'assets/images/new-product-icon.png';
import castYupErrors from './castErrors';

const defaultGuaranteeImage = 'https://s3.us-east-2.amazonaws.com/static.leadcart.io/5d3bd34e97d3ea503e8659af/products/guarantee-badge.png';

const featuresSchema = yup.object({
  enabled: yup.boolean().default(false),
  title: yup.string().default('Features List'),
  list: yup.array().of(yup.object({
    title: yup.string().default('Feature Title'),
    text: yup.string().default('Feature Description'),
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


const pagePreferencesSchema = yup.object({
  template: yup.string().default('temp1'),
  orderButtonText: yup.string().default('Complete Order'),
  declineButtonText: yup.string().default('No thanks!'),
  themeColor: yup.string().default('#8ED1FC'),
  backgroundColor: yup.string().default('#eee'),
  productBackgroundColor: yup.string().default('#fff'),
  features: featuresSchema,
  guaranteed: yup.object({
    enabled: yup.bool().default(false),
    url: yup.string().url().default(defaultGuaranteeImage)
  }),
  logo: yup.string().default(defaultLogo),
  termsAndConditions: termsAndConditionsSchema,
  testimonials: testimonialsSchema,
  widgets: yup.object({
    progressBar: yup.object({
      enabled: yup.bool().default(false),
      type: yup.string(),
      value: yup.number().default(60),
      color: yup.string(),
      label: yup.string(),
    })
  }),
  image: yup.string(),
  description: yup.string(),
  asset: yup.object({
    link: yup.string().url(),
    type: yup.string(),
    visible: yup.bool()
  }),
  orderNote: yup.object({
    enabled: yup.boolean(),
    text: yup.string(),
    style: yup.string()
  })
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

const sectionSchema = yup.mixed();

const ProductSchema = yup.object({
  available: yup.boolean().default(false),
  // pagePreferences: yup.object().transform((val) => undefined),
  // offer: offerSchema,
  name: yup.string().default('Product-Name'),
  internalName: yup.string(),
  thumbnail: yup.string(),
  // url: yup.string().default(() => ids.generate()),
  price: yup.object({
    amount: yup.number().required(),
    currency: yup.string().default('USD'),
    format: yup.string().default('amount'),
  }).required(),
  payment: yup.object({
    methods: yup.array().of(yup.string()),
    type: yup.string().default('Onetime'),
    recurringPeriod: yup.string().when('type', (type, schema) => (type === 'Onetime' ? schema.transform(() => undefined) : schema.default('MONTH'))),
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
  settings: yup.object({
    language: yup.string()
  }),
  sections: yup.array().of(sectionSchema),
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
    console.log(err);
    return {
      isValid: false,
      errors: castYupErrors(err)
    };
  }
};


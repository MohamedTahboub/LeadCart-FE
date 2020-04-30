import * as yup from 'yup';
import castYupErrors from './castErrors';


const sectionSchema = yup.mixed();

const ProductSchema = yup.object({
  available: yup.boolean().default(false),
  name: yup.string().default('Product-Name'),
  internalName: yup.string(),
  thumbnail: yup.string(),
  price: yup.object({
    amount: yup.number().required(),
    currency: yup.string().default('USD'),
    format: yup.string().default('amount')
  }).required(),
  payment: yup.object({
    methods: yup.array().of(yup.string()),
    type: yup.string().default('Onetime'),
    recurringPeriod: yup.string()
      .when('type', (
        type,
        schema
      ) => (
        type === 'Onetime'
          ? schema.transform(() => undefined)
          : schema.default('MONTH')
      )),
    splits: yup.string().when(
      'type',
      {
        is: 'Split',
        then: yup.string().default('3'),
        otherwise: yup.string().transform(() => undefined)
      }
    )
  }),
  fulfillment: yup.string(),
  coupons: yup.object({ enabled: yup.bool().transform((val) => !!val) }),
  shippingDetails: yup.object({ enabled: yup.bool() }),
  settings: yup.object({ language: yup.string() }),
  sections: yup.array().of(sectionSchema),
  pageStyles: yup.mixed(),
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
    return {
      isValid: false,
      errors: castYupErrors(err)
    };
  }
};

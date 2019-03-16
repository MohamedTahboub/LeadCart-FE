import * as yup from 'yup';
import castYupErrors from './castErrors';


const featureSchema = yup.object({
  title: yup.string(),
  description: yup.string(),
});
const testimonialSchema = yup.object({
  author: yup.string().required(),
  image: yup.string().required(),
  text: yup.string().required(),
});


const checkoutPage = yup.object({
  template: yup.string().default('temp1'),
  presetColors: yup.string()
})

const mandatoryDetails = yup.object({
  name: yup.string().required(),
  internalName: yup.string(),
  image: yup.string(),
  url: yup.string().url().required(),
  description: yup.string(),
  price: yup.object({
    amount: yup.number().required(),
    currency: yup.string().default('USD')
  }).required(),
  tags: yup.array().of(yup.string()),
  payment: yup.object({
    type: yup.string(),
    recurringPeriod: yup.string(),
    splits: yup.string()
  })
})

const booster = yup.object({
  features: yup.array().of(featureSchema).max(6),
  featuresTitle: yup.string(),
  testimonials: yup.array().of(testimonialSchema).max(2),
  checkoutButtonText: yup.string(),
  termsAndConditions: yup.object({
    enabled: yup.boolean(),
    url: yup.string().url().oneOf([true])
  })
})

export default async (upsell) => {

  const upsellSchema = yup.object().shape({
    name: yup.string().required('Upsell Name Required'),
    price: yup.object().shape({
      amount: yup.number().required('Required').positive().integer(),
      currency: yup.string().default('USD')
    }),
    description: yup.string().required('Upsell Description is Required'),
    assets: yup.object().shape({
      assetsType: yup.string().default('vedio'),
      assetLink: yup.string().url('Should be a valid link').required()
    }),
    featuresTitle: yup.string().required(),
    features: yup.array().of(featureSchema).max(4),
    fulfillment: yup.string().url('Should be a valid link').required(),
    linkedProduct: yup.string().required('Select a product to link this upsell to'),
    actionBtn: yup.object({
      color: yup.string().default('#5100ff'),
      text: yup.string('Should not be empty').default('Download Now'),
    })
  }).required();

  try {
    const castedUpsell = await upsellSchema.validateSync(upsell, { abortEarly: false, stripUnknown: true });
    return { isValid: true, value: castedUpsell };
  } catch (err) {
    return { isValid: false, errors: castYupErrors(err) };
  }
};


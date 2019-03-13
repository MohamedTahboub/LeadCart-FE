import * as yup from 'yup';
import castYupErrors from './castErrors';

export default async (upsell) => {
  const featureSchema = yup.object({
    title: yup.string(),
    description: yup.string(),
  });

  const upsellSchema = yup.object().shape({
    name: yup.string().required('required field'),
    active: yup.boolean(),
    price: yup.object().shape({
      amount: yup.number().required('required field').positive().integer(),
      currency: yup.string().default('USD')
    }),
    description: yup.string().required('required field'),
    assets: yup.object().shape({
      assetsType: yup.string().default('video'),
      assetLink: yup.string().url().required('Should be a valid link')
    }),
    featuresTitle: yup.string().required('required field'),
    features: yup.array().of(featureSchema).max(4),
    fulfillment: yup.string().url().required('Should be a valid link'),
    linkedProduct: yup.string().required('select a product'),
    upsellLayout: yup.string().default('vertical'),
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


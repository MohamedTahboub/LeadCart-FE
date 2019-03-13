import * as yup from 'yup';
import castYupErrors from './castErrors';

export default async (upsell) => {
  const featureSchema = yup.object({
    title: yup.string(),
    description: yup.string(),
  });

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


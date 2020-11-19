import * as yup from 'yup';
import castYupErrors from './castErrors';

const SHIPPING_RATES_SCHEMA = yup.object().shape({
  from: yup.number().required(),
  to: yup.string().required(),
  cost: yup.number().required(),
  _id: yup.string().required(),
  rowNumber: yup.number().required()
});

export default async (shippingRule) => {
  const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    enabled: yup.bool().default(true),
    shippingRates: yup.array().of(SHIPPING_RATES_SCHEMA),
    shippingZone:  yup.string().required(),
    description:  yup.string().required()
  }).required();

  try {
    const casted = await schema.validateSync(shippingRule, { abortEarly: false, stripUnknown: true });
    return { isValid: true, value: casted };
  } catch (err) {
    const { errors: [firstErrorMessage] = [] } = err || {};
    return {
      isValid: false,
      errors: castYupErrors(err),
      message: firstErrorMessage || err.message
    };

  }
};

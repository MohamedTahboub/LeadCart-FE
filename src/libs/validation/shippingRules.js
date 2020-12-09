import * as yup from 'yup';
import castYupErrors from './castErrors';

const shippingRatesSchema = yup.object().shape({
  from: yup.number().required(),
  to: yup.number().required(),
  cost: yup.number().default(0)
});

export default async (shippingRule) => {
  const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    enabled: yup.bool().default(true),
    rates: yup.array().of(shippingRatesSchema),
    zone:  yup.string().nullable().default(null),
    description: yup.string()
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

import * as yup from 'yup';
import castYupErrors from './castErrors';

const COSTS_SCHEMA = yup.object().shape({
  zone: yup.string().required(),
  cost: yup.number().required()
});

export default async (shippingRole) => {
  const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    enabled: yup.bool().default(true),
    otherZonesCost: yup.number().required(),
    costsPerZone: yup.array().of(COSTS_SCHEMA)
  }).required();

  try {
    const casted = await schema.validateSync(shippingRole, { abortEarly: false, stripUnknown: true });
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

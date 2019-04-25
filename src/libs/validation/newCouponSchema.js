import * as yup from 'yup';
import castYupErrors from './castErrors';

export default async (coupon) => {
  const schema = yup.object().shape({
    code: yup.string().required(),
    duration: yup.date(),
    active: yup.bool(),
    type: yup.string().oneOf(['Flat', 'Percent']).required(),
    forAll: yup.bool().required(),
    percent: yup.when('type',
      {
        is: 'Percent',
        then: yup.number().required(),
        otherwise: false
      }),
    amount: yup.when('type',
      {
        is: 'Flat',
        then: yup.number().required(),
        otherwise: false
      }),
    productId: yup.when('forAll', {
      is: false,
      then: yup.string().required(),
      otherwise: false
    })
  }).required();

  try {
    const casted = await schema.validateSync(coupon, { abortEarly: false, stripUnknown: true });
    return { isValid: true, value: casted };
  } catch (err) {
    return { isValid: false, errors: castYupErrors(err) };
  }
};


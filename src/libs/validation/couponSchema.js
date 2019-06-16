import * as yup from 'yup';
import castYupErrors from './castErrors';

export default async (coupon) => {//
  const schema = yup.object().shape({
    code: yup.string().couponCode().required('coupon code is required'),
    duration: yup.date(),
    forAll: yup.bool().required(),
    active: yup.bool(),
    discount: yup.object({
      type: yup.string().oneOf(['Flat', 'Percent']).required(),
      percent: yup.number().when('type',
        {
          is: 'Percent',
          then: yup.number().required('the discount amount is required'),
          otherwise: yup.number().transform(() => undefined)
        }),
      amount: yup.number().when('type',
        {
          is: 'Flat',
          then: yup.number().required('the discount amount is required'),
          otherwise: yup.number().transform(() => undefined)
        }),
    }).required(),
    productId: yup.string().when('forAll', {
      is: false,
      then: yup.string().required(),
      otherwise: yup.string().transform(() => undefined)
    })
  }).required();

  try {
    const casted = await schema.validateSync(coupon, { abortEarly: false, stripUnknown: true });
    return { isValid: true, value: casted };
  } catch (err) {
    return { isValid: false, errors: castYupErrors(err) };
  }
};


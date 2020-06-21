import * as yup from 'yup';
import castYupErrors from './castErrors';

export default async (coupon) => {//
  const schema = yup.object().shape({
    code: yup.string().couponCode().required('coupon code is required'),
    duration: yup.date(),
    active: yup.bool(),
    discount: yup.object({
      type: yup.string().oneOf(['Flat', 'Percent']).required(),
      percent: yup.number().when(
        'type',
        {
          is: 'Percent',
          then: yup.number().required('the discount amount is required'),
          otherwise: yup.number().transform(() => undefined)
        }
      ),
      amount: yup.number().when(
        'type',
        {
          is: 'Flat',
          then: yup.number().required('the discount amount is required'),
          otherwise: yup.number().transform(() => undefined)
        }
      )
    }).required(),
    products: yup.array().of(yup.string())

  }).required();

  try {
    const casted = await schema.validateSync(coupon, { abortEarly: false, stripUnknown: true });
    return { isValid: true, value: casted };
  } catch (err) {
    return { isValid: false, errors: castYupErrors(err) };
  }
};


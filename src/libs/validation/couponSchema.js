import * as yup from 'yup';
import castYupErrors from './castErrors';

export default async (coupon) => {//
  const schema = yup.object().shape({
    code: yup.string().couponCode().required('coupon code is required'),
    duration: yup.date('Select a valid duration for the coupon'),
    active: yup.bool(),
    discount: yup.object({
      type: yup.string().oneOf(['Flat', 'Percent']).required('The coupon code must be either a percentage or flat'),
      percent: yup.number('enter an amount').when(
        'type',
        {
          is: 'Percent',
          then: yup.number().required('the discount amount is required'),
          otherwise: yup.number().transform(() => undefined)
        }
      ),
      amount: yup.number('enter an amount').when(
        'type',
        {
          is: 'Flat',
          then: yup.number('enter the Flat value').required('the discount amount is required'),
          otherwise: yup.number('enter the percentage value').transform(() => undefined)
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


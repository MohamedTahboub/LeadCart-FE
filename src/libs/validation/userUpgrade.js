import * as yup from 'yup';
import castYupErrors from './castErrors';

export default async (packageDetails) => {//
  const schema = yup.object().shape({
    packageType: yup.string().oneOf(['Pro', 'Premium']).required(),
    recurringPeriod: yup.string().oneOf(['Monthly', 'Yearly']).required(),
    useOldCredit: yup.bool().default(false),
    amount: yup.number(),
    promoCode: yup.string(),
    credit: yup.mixed().when('amount', {
      is: 0,
      then: yup.object().strip(),
      otherwise: yup.object({
        cardNumber: yup.string().required(),
        expiryMonth: yup.string().required(),
        expiryYear: yup.string().required(),
        cvc: yup.string().required()
      })
    }),
  }).required();

  try {
    const casted = await schema.validateSync(packageDetails, { abortEarly: false, stripUnknown: true });
    return { isValid: true, value: casted };
  } catch (err) {
    return { isValid: false, errors: castYupErrors(err) };
  }
};


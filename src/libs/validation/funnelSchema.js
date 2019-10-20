import * as yup from 'yup';
import castYupErrors from './castErrors';


const funnelSchema = yup.object({
  product: yup.string().required(),
  upSells: yup.array().of(yup.string()).default([]),
  thankyouPage: yup.string()
});

export default async (funnel) => {
  try {
    const casted = await funnelSchema.validateSync(funnel, { abortEarly: false, stripUnknown: true });
    return {
      isValid: true,
      value: casted
    };
  } catch (err) {
    console.log(err);
    return {
      isValid: false,
      errors: castYupErrors(err)
    };
  }
};


import * as yup from 'yup';
import castYupErrors from './castErrors';
import { toLowerCase } from './yupMethods'

export const freeTrailSignup = async (user) => {
  const schema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().required(),
    companyName: yup.string(),
    password: yup.string().required(),
    subDomain: yup.string().transform(toLowerCase),
    promoCode: yup.string().promoCode()
  }).required();

  try {
    const castedDetails = await schema.validateSync(user, { abortEarly: false, stripUnknown: true });
    return { isValid: true, value: castedDetails };
  } catch (err) {
    return { isValid: false, errors: castYupErrors(err) };
  }
};


export const proSignup = async (user) => {
  const schema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().required(),
    companyName: yup.string(),
    code: yup.string().required(),
    password: yup.string().required(),
    subDomain: yup.string().transform(toLowerCase)
  }).required();

  try {
    const castedDetails = await schema.validateSync(user, { abortEarly: false, stripUnknown: true });
    return { isValid: true, value: castedDetails };
  } catch (err) {
    return { isValid: false, errors: castYupErrors(err) };
  }
};


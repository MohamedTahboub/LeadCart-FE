import * as yup from 'yup';
import castYupErrors from './castErrors';

export default async (fields) => {//
  const schema = yup.object({
    name: yup.string().default('Company Name'),
    logo: yup.string().url('Upload a Valid image'),
    subDomain: yup.string().subDomain('Please Enter A valid Sub Domain').required(''),
    country: yup.string().default('US'),
    currency: yup.string().default('US'),
    timeZone: yup.string().default('Central America'),
    supportEmail: yup.string().email(),
    layout: yup.object({
      name: yup.string().default('MarketPlace Name'),
      coverImage: yup.string().url(),
      links: yup.array()
    }).required()
  }).required();

  try {
    const casted = await schema.validateSync(fields, { abortEarly: false, stripUnknown: true });

    return { isValid: true, value: casted };
  } catch (err) {
    return { isValid: false, errors: castYupErrors(err) };
  }
};


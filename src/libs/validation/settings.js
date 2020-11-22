import * as yup from 'yup';
import castYupErrors from './castErrors';
import { toLowerCase } from './yupMethods';
const leadcartDefaultLogo = 'https://s3.us-west-2.amazonaws.com/assets.leadcart.io/5e70880c81f85530d0ecd553/products/h7xj6g0o8%20%283%29%20%282%29.jpeg';

export default async (fields) => {//
  const schema = yup.object({
    name: yup.string().default('Company Name'),
    logo: yup.string().url('Upload a Valid image'),
    subDomain: yup.string().subDomain('Please Enter A valid Sub Domain').required('').transform(toLowerCase),
    country: yup.string().default('US'),
    currency: yup.string().default('US'),
    timeZone: yup.string().default('Central America'),
    supportEmail: yup.string().email(),
    layout: yup.object({
      name: yup.string().default('MarketPlace Name'),
      coverImage: yup.string().url(),
      links: yup.array(yup.object({
        label: yup.string().required(),
        value: yup.string().required()
      }))
    }).required(),
    showPoweredBy: yup.boolean().default(true),
    systemEmails: yup.object({
      newOrder: yup.boolean().default(true),
      newLead: yup.boolean().default(true)
    }),
    favicon: yup.string().url()
  }).required();

  try {
    const casted = await schema.validateSync(fields, { abortEarly: false, stripUnknown: true });

    return { isValid: true, value: casted };
  } catch (err) {
    return { isValid: false, errors: castYupErrors(err) };
  }
};


export const contactLinksSchema = async (fields) => {
  const schema = yup.object({
    label: yup.string().required('Please add a descriptive Label'),
    value: yup.string().url().required('Add a valid url for the link')
  }).required();

  try {
    const casted = await schema.validateSync(fields, { abortEarly: false, stripUnknown: true });

    return { isValid: true, value: casted };
  } catch (err) {
    return { isValid: false, errors: castYupErrors(err) };
  }
};

const concatError = (errors = []) => {
  if (!Array.isArray(errors)) return '';

  return errors.join('\n- ');
};
export const invoicingSettingsSchema = async (fields) => {
  const schema = yup.object({
    companyName: yup.string().required(),
    address: yup.object({
      streetAddress: yup.string().required(),
      streetAddressLine2: yup.string(),
      state: yup.string(),
      city: yup.string().required(),
      country: yup.string().required()
    }),
    logo: yup.string().url().default(leadcartDefaultLogo),
    taxId: yup.string(),
    enabled: yup.boolean().required()
  }).required();

  try {
    const casted = await schema.validateSync(fields, { abortEarly: false, stripUnknown: true });

    return { isValid: true, value: casted };
  } catch (err) {

    return { isValid: false, errors: castYupErrors(err), errorMessage: err.message, errorList: concatError(err.errors) };
  }
};

import * as yup from 'yup';
import castYupErrors from './castErrors';

export default async (settings) => {
  const settingsSchema = yup.object().shape({
    name: yup.string().default(' '),
    logo: yup.string().url(),
    country: yup.string().default('US'),
    timeZone: yup.string().default('(GMT-06:00) Central America'),
    supportEmail: yup.string().email(),
    currency: yup.string().default('USD')
  }).required();

  try {
    const castedSettings = await settingsSchema.validateSync(settings, { abortEarly: false, stripUnknown: true });
    return { isValid: true, value: castedSettings };
  } catch (err) {
    return { isValid: false, errors: castYupErrors(err) };
  }
};


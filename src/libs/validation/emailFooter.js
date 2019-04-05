import * as yup from 'yup';
import castYupErrors from './castErrors';

export default async (details) => {
  const socialMediaLink = yup.object({
    name: yup.string().required(),
    // name: yup.valid(['facebook', 'twitter', 'instagram', 'linkedin']).required(),
    link: yup.string().url().required(),
  });

  const footerSchema = yup.object().shape({
    companyAddress: yup.string().required('required field'),
    companyPhone: yup.string().required(),
    socialMedia: yup.array().of(socialMediaLink)
  }).required();

  try {
    const castedDetails = await footerSchema.validateSync(details, { abortEarly: false, stripUnknown: true });
    return { isValid: true, value: castedDetails };
  } catch (err) {
    return { isValid: false, errors: castYupErrors(err) };
  }
};


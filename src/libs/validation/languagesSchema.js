import * as yup from 'yup';
import castYupErrors from './castErrors';

export default async (user) => {
  const baseWordSchema = {
    key: yup.string().required(),
    // label: yup.string().required(),
    value: yup.string().required()
  };


  const languageWordSchema = yup.object({
    ...baseWordSchema,
    subs: yup
      .array()
      .of(yup.object(baseWordSchema))
  });


  const languageContextSchema = yup.object({
    key: yup.string(),
    title: yup.string().required(),
    words: yup.array().of(languageWordSchema).required()
  });

  const languageSchema = yup.object({
    name: yup.string().required(),
    type: yup.string().default('ltr'),
    languageCode: yup.string().required(),
    contexts: yup.array().of(languageContextSchema)
  });

  try {
    const castedDetails = await languageSchema.validateSync(user, { abortEarly: false, stripUnknown: true });
    return { isValid: true, value: castedDetails };
  } catch (err) {
    return { isValid: false, errors: castYupErrors(err) };
  }
};

import * as yup from 'yup';
import castYupErrors from './castErrors';


export default async (fonts) => {
  const fontSchema = yup.object({
    family: yup.string().required(),
    url: yup.string().required(),
    type: yup.string().required(),
    variant: yup.string().required()
  });

  const fontsSchema = yup.array().of(fontSchema);


  try {
    const fontsDetails = await fontsSchema.validateSync(fonts, { abortEarly: false, stripUnknown: true });
    return { isValid: true, value: fontsDetails };
  } catch (err) {
    return { isValid: false, errors: castYupErrors(err) };
  }
};


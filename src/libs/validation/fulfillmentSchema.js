import * as yup from 'yup';
import castYupErrors from './castErrors';

export default async (fulfillment) => {
  const successUrls = yup.array().of(yup.string().url()).min(1);

  const metaData = yup.object({
    serviceName: yup.string().required(),
    description: yup.string(),
    contentType: yup.string(),
    enabled: yup.boolean().required(),
  });

  const schema = yup.object().shape({
    name: yup.string().required(),
    type: yup.string().required(),
    successUrls: successUrls.when('type', {
      is: 'successUrls',
      then: successUrls.required(),
      otherwise: yup.array().transform(() => undefined)
    }),
    metaData: metaData.when('type', {
      is: 'manual',
      then: metaData.required(),
      otherwise: yup.object()
    })
  }).required();

  try {
    const casted = await schema.validateSync(fulfillment, {
      abortEarly: false,
      stripUnknown: true
    });

    return { isValid: true, value: casted };
  } catch (err) {
    return { isValid: false, errors: castYupErrors(err) };
  }
};


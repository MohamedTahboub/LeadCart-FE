import * as yup from 'yup';
import castYupErrors from './castErrors';

export default async (fulfillment) => {
  const successUrls = yup.array().of(yup.string().url());

  const metaData = yup.object({
    serviceName: yup.string().required(),
    description: yup.string(),
    contentType: yup.string(),
    enabled: yup.boolean().required(),
  });

  const schema = yup.object().shape({
    type: yup.string().default('noFulfillment'),
    status: yup.boolean(),
    successUrls: yup.when('type', {
      is: 'successUrls',
      then: successUrls,
      otherwise: yup.forbidden()
    }),
    metaData: yup.when('type', {
      is: 'manual',
      then: metaData,
      otherwise: yup.forbidden()
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


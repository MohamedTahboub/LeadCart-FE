import * as yup from 'yup';
import castYupErrors from './castErrors';

export default async (fulfillment) => {
  const successUrls = yup.array().of(yup.object({
    url: yup.string(),
    activeDuration: yup.string().default('7,day')
  }));

  const metaData = yup.object({
    enabled: yup.boolean().default(false),
    serviceName: yup.string(),
    description: yup.string(),
    contentType: yup.string(),
  });

  const schema = yup.object().shape({
    name: yup.string().required(),
    type: yup.string().required(),
    successUrls: successUrls.when('type', {
      is: 'successUrls',
      then: successUrls.min(1).required()
    }),
    metaData: metaData.when('type', {
      is: 'manual',
      then: metaData.required()
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


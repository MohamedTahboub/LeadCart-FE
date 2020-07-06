import * as yup from 'yup';
import castYupErrors from './castErrors';

const metaDataSchema = yup.mixed({}).default({});
const successUrlMetaSchema = yup.object({
  successUrls: yup.array().of(yup.object({
    url: yup.string(),
    activeDuration: yup.string().default('7,day')
  })).default([])
});

const manualFulfillmentMetaData = yup.object({
  fulfillmentMeta: yup.object({
    serviceName: yup.string(),
    description: yup.string(),
    contentType: yup.string()
  })
}).default({});

const leadcartPrivateFulfillmentMetaData = yup.object({
  codeType: yup.string().default('Package'),
  packageType: yup.string().when('codeType', {
    is: 'Package',
    then: yup.string().default('Basic')
  }),
  credits: yup.mixed().when('codeType', {
    is: 'Credits',
    then: yup.number().default(0),
    otherwise: yup.string().transform(() => undefined)
  }),
  unlimited: yup.mixed().when('codeType', {
    is: 'Package',
    then: yup.boolean().default(false),
    otherwise: yup.string().transform(() => undefined)
  })
});

const actionSchema = yup.object({
  type: yup.string(),
  integrationKey: yup.string(),
  metaData: metaDataSchema.when('type', {
    is: 'SUCCESS_URLS',
    then: successUrlMetaSchema,
    otherwise: metaDataSchema.when('type', {
      is: 'MANUAL_FULFILLMENT',
      then: manualFulfillmentMetaData,
      otherwise: metaDataSchema.when('type', {
        is: 'LEADCART_FULFILLMENT',
        then: leadcartPrivateFulfillmentMetaData,
        otherwise: yup.object().default({})
      })

    })
  })
});

const triggerGroupsSchema = yup.object({
  products: yup.array(yup.string()).default([]),
  action: actionSchema
});


const funnelRuleSchema = yup.object({
  trigger: yup.string().required(),
  triggerGroups: yup.array(triggerGroupsSchema).default([])
});

export default async (funnelRule) => {
  try {
    const casted = await funnelRuleSchema.validateSync(funnelRule, { abortEarly: false, stripUnknown: true });
    return {
      isValid: true,
      value: casted
    };
  } catch (err) {
    return {
      isValid: false,
      errors: castYupErrors(err)
    };
  }
};

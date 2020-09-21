import * as yup from 'yup';
import castYupErrors from './castErrors';

const removeIt = yup.string().transform(() => undefined);

const metaDataSchema = yup.mixed();

const successUrlMetaSchema = yup.object({
  successUrls: yup.array().of(yup.object({
    url: yup.string(),
    activeDuration: yup.string().default('7,day')
  })).default([])
});
const webhooksSchema = yup.object({
  label: yup.string(),
  url: yup.string(),
  payloadFormat: yup.string().default('FORM_DATA')
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
    then: yup.string().default('Basic'),
    otherwise: removeIt
  }),
  credits: yup.mixed().when('codeType', {
    is: 'Credits',
    then: yup.number().default(0),
    otherwise: removeIt
  }),
  unlimited: yup.mixed().when('codeType', {
    is: 'Package',
    then: yup.boolean().default(false),
    otherwise: removeIt
  })
});

const actionSchema = yup.object({
  type: yup.string(),
  integrationKey: yup.string().when('type', {
    is: 'WEBHOOKS',
    then: yup.string().transform(() => 'leadcart_fulfillment'),
    otherwise: yup.string().required()
  }),
  metaData: metaDataSchema.when('integrationKey', {
    is: 'WEBHOOKS',
    then: webhooksSchema,
    otherwise: metaDataSchema.when('type', {
      is: 'SUCCESS_URLS',
      then: successUrlMetaSchema,
      otherwise: metaDataSchema.when('type', {
        is: 'MANUAL_FULFILLMENT',
        then: manualFulfillmentMetaData,
        otherwise: metaDataSchema.when('type', {
          is: 'LEADCART_FULFILLMENT',
          then: leadcartPrivateFulfillmentMetaData,
          otherwise: metaDataSchema.when('type', {
            is: 'REVOKE_LEADCART_ACCESS',
            then: metaDataSchema.default({ temp: true }),
            otherwise: metaDataSchema
          })
        })
      })
    })
  })
});

const triggerGroupsSchema = yup.object({
  products: yup.array().of(yup.string()).default([]),
  pricingOptions: yup.array().of(yup.string()).default([]),
  action: actionSchema
});


const funnelRuleSchema = yup.object({
  trigger: yup.string().required(),
  triggerGroups: yup.array(triggerGroupsSchema).default([])
});

export default (funnelRule) => {
  try {
    const casted = funnelRuleSchema.validateSync(funnelRule, { abortEarly: false, stripUnknown: true });
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

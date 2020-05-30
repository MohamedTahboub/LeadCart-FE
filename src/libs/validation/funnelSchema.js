import * as yup from 'yup';
import castYupErrors from './castErrors';

const funnelCoverDefaultImage = 'https://s3.us-east-2.amazonaws.com/assets.leadcart.io/5d3bd34e97d3ea503e8659af/products/funnelDemoFlow.png';

const coordinatesSchema = yup.object({
  x: yup.number(),
  y: yup.number(),
  shiftX: yup.number(),
  shiftY: yup.number(),
  height: yup.number(),
  width: yup.number()
});


const RelationsSchema = yup.object({
  target: yup.string(),
  type: yup.string(),
  coordinates: coordinatesSchema
});

const ProductsSchema = yup.object({
  productId: yup.string().transform((val) => (val && val.trim() ? val : undefined)),
  relations: yup.array().of(RelationsSchema).default([]),
  coordinates: coordinatesSchema,
  elementId: yup.string(),
  category: yup.string()
});

const funnelSchema = yup.object({
  name: yup.string(),
  style: yup.string(),
  thumbnail: yup.string().default(funnelCoverDefaultImage),
  startPoint: yup.string(),
  products: yup.array().of(ProductsSchema).default([]),
  thankyouPage: yup.string().nullable(),
  productsUpdates: yup.object({}),
  url: yup.string()
});

export default async (funnel) => {
  try {
    const casted = await funnelSchema.validateSync(funnel, { abortEarly: false, stripUnknown: true });
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

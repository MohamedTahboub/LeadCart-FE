import * as yup from 'yup';
import castYupErrors from './castErrors';


const coordsSchema = yup.object({
  x: yup.string(),
  y: yup.string(),
});


const RelationsSchema = yup.object({
  target: yup.string(),
  from: coordsSchema,
  to: coordsSchema
});

const ProductsSchema = yup.object({
  productId: yup.string().required(),
  relations: yup.array().of(RelationsSchema).default([]),
  position: yup.string(),
  elementId: yup.string(),
  category: yup.string()
});

const funnelSchema = yup.object({
  name: yup.string(),
  style: yup.string(),
  thumbnail: yup.string().required(),
  startPoint: yup.string().required(),
  products: yup.array().of(ProductsSchema).default([]),
  thankyouPage: yup.string(),
  productsUpdates: yup.object({}),
  url: yup.string().url()
});

export default async (funnel) => {
  try {
    const casted = await funnelSchema.validateSync(funnel, { abortEarly: false, stripUnknown: true });
    return {
      isValid: true,
      value: casted
    };
  } catch (err) {
    console.log(err);
    return {
      isValid: false,
      errors: castYupErrors(err)
    };
  }
};


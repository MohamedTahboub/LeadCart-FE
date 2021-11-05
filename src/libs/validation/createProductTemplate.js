import * as yup from 'yup';
import castYupErrors from './castErrors';

const validate = async (schema, data) => {
  try {
    const fontsDetails = await schema.validateSync(data, { abortEarly: false, stripUnknown: true });
    return { isValid: true, value: fontsDetails };
  } catch (err) {
    return { isValid: false, errors: castYupErrors(err) };
  }
};

const productTemplateSchema = yup.object({
  name: yup.string().required(),
  handle: yup.string().required(),
  options: yup.object({
    sync: yup.bool().default(false),
    protected: yup.bool().default(false),
    secureKey: yup.string()
  }),
  type: yup.string().required(),
  layout: yup.mixed(),
  screenshot: yup.string().required(),
  productId: yup.string().required()
});

export const createProductsTemplate = async (data) => {

  return validate(productTemplateSchema, data);
};

export const updateProductsTemplate = async (data) => {
  const schema = {
    productId: yup.string().required(),
    details: productTemplateSchema
  };

  return validate(schema, data);
};

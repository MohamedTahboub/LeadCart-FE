import {
  NEW_PRODUCT_FIELD_UPDATE,
  NEW_PRODUCT_INVALID_FORM,
  PRODUCT_DETAILS_FIELD_UPDATE,
  CREATE_NEW_PRODUCT,
  PRODUCT_CREATED_SUCCESSFULY,
  PRODUCT_CREATION_FAILD,
  UPDATE_PRODUCT,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAILD,
  GET_PRODUCT_DETAILS,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_FAILD,
  PRODUCT_CHECKOUT_TEMPLATE_UPDATE,
  PRODUCT_PAYMENT_METHOD_UPDATE,
  PRODUCT_BUMP_SETTING_UPDATE,
  PRODUCT_ADVANCE_SETTING_UPDATE,
  PRODUCT_CHECKOUT_FIELD_UPDATE,
  PRODUCT_PAYMENT_FIELD_UPDATE,
  PRODUCT_BUMP_FIELD_UPDATE,
  PRODUCT_SETTING_FIELD_UPDATE,
  DELETE_USER_PRODUCT,
  DELETE_USER_PRODUCT_SUCCESS,
  DELETE_USER_PRODUCT_FAILD
} from 'constantsTypes';


export const onNewProductFieldChange = (field) => ({
  type: NEW_PRODUCT_FIELD_UPDATE,
  payload: field
});
export const onProductDetailsFieldChange = (field) => ({
  type: PRODUCT_DETAILS_FIELD_UPDATE,
  payload: field
});

export const onProductCheckoutFieldChange = (field) => ({
  type: PRODUCT_CHECKOUT_FIELD_UPDATE,
  payload: field
});
export const onProductPaymentFieldChange = (field) => ({
  type: PRODUCT_PAYMENT_FIELD_UPDATE,
  payload: field
});
export const onProductBumpFieldChange = (field) => ({
  type: PRODUCT_BUMP_FIELD_UPDATE,
  payload: field
});
export const onProductSettingFieldChange = (field) => ({
  type: PRODUCT_SETTING_FIELD_UPDATE,
  payload: field
});


export const createNewProduct = () => ({
  type: CREATE_NEW_PRODUCT
});

export const newProductInvalidFields = (errors) => ({
  type: NEW_PRODUCT_INVALID_FORM,
  payload: errors
});
export const productCreated = (product) => ({
  type: PRODUCT_CREATED_SUCCESSFULY,
  payload: product
});

export const productCreatingFaild = (message) => ({
  type: PRODUCT_CREATION_FAILD,
  payload: message
});
export const updateProduct = (product) => ({
  type: UPDATE_PRODUCT,
  payload: product
});

export const productUpdatedSuccessfuly = (product) => ({
  type: UPDATE_PRODUCT_SUCCESS,
  payload: product
});

export const productUpdateFaild = (message) => ({
  type: UPDATE_PRODUCT_FAILD,
  payload: message
});

export const getProduct = (id) => ({
  type: GET_PRODUCT_DETAILS,
  payload: id
});

export const getProductSuccess = (product) => ({
  type: GET_PRODUCT_SUCCESS,
  payload: product
});

export const getProductFaild = (product) => ({
  type: GET_PRODUCT_FAILD,
  payload: product
});

export const deleteProduct = (id) => ({
  type: DELETE_USER_PRODUCT,
  payload: id
});

export const deleteProductSuccess = (product) => ({
  type: DELETE_USER_PRODUCT_SUCCESS,
  payload: product
});

export const deleteProductFaild = (product) => ({
  type: DELETE_USER_PRODUCT_FAILD,
  payload: product
});


export const productCheckoutDesignUpdate = (checkout) => ({
  type: PRODUCT_CHECKOUT_TEMPLATE_UPDATE,
  payload: checkout
});
export const productPaymentUpdate = (payment) => ({
  type: PRODUCT_PAYMENT_METHOD_UPDATE,
  payload: payment
});
export const productOrderBumpUpdate = (bump) => ({
  type: PRODUCT_BUMP_SETTING_UPDATE,
  payload: bump
});
export const productAdvanceSettingUpdate = (advanceSetting) => ({
  type: PRODUCT_ADVANCE_SETTING_UPDATE,
  payload: advanceSetting
});

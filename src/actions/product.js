import {
  NEW_PRODUCT_FIELD_UPDATE,
  NEW_PRODUCT_INVALID_FORM,
  PRODUCT_DETAILS_FIELD_UPDATE,
  CREATE_NEW_PRODUCT,
  PRODUCT_CREATED_SUCCESSFULY,
  PRODUCT_CREATION_FAILD,
  UPDATE_PRODUCT_DETAILS,
  UPDATE_PRODUCT_DETAILS_SUCCESS,
  UPDATE_PRODUCT_DETAILS_FAILD,
  GET_PRODUCT_DETAILS,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_FAILD,
  UPDATE_PRODUCT_CHECKOUT_TEMPLATE,
  UPDATE_PRODUCT_PAYMENT_METHOD,
  UPDATE_PRODUCT_BUMP_SETTING,
  UPDATE_PRODUCT_ADVANCE_SETTING,
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
export const updateProductDetails = (product) => ({
  type: UPDATE_PRODUCT_DETAILS,
  payload: product
});

export const productUpdatedSuccessfuly = (product) => ({
  type: UPDATE_PRODUCT_DETAILS_SUCCESS,
  payload: product
});

export const productUpdatedFaild = (message) => ({
  type: UPDATE_PRODUCT_DETAILS_FAILD,
  payload: message
});

export const getProduct = (url) => ({
  type: GET_PRODUCT_DETAILS,
  payload: url
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


export const updateProductCheckoutDesign = (checkout) => ({
  type: UPDATE_PRODUCT_CHECKOUT_TEMPLATE,
  payload: checkout
});
export const updateProductPayment = (payment) => ({
  type: UPDATE_PRODUCT_PAYMENT_METHOD,
  payload: payment
});
export const updateProductOrderBump = (bump) => ({
  type: UPDATE_PRODUCT_BUMP_SETTING,
  payload: bump
});
export const updateProductAdvanceSetting = (advanceSetting) => ({
  type: UPDATE_PRODUCT_ADVANCE_SETTING,
  payload: advanceSetting
});

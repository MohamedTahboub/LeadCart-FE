import {
  CREATE_NEW_PRODUCT,
  DELETE_USER_PRODUCT,
  DELETE_USER_PRODUCT_FAILED,
  DELETE_USER_PRODUCT_SUCCESS,
  GET_PRODUCT_DETAILS,
  GET_PRODUCT_FAILED,
  GET_PRODUCT_SUCCESS,
  NEW_PRODUCT_FIELD_UPDATE,
  NEW_PRODUCT_INVALID_FORM,
  PRODUCT_BOOSTERS_FIELD_UPDATE,
  PRODUCT_BUMPOFFER_FIELD_UPDATE,
  PRODUCT_CHECKOUT_FIELD_UPDATE,
  PRODUCT_CREATED_SUCCESSFULLY,
  PRODUCT_CREATION_FAILED,
  PRODUCT_DETAILS_FIELD_UPDATE,
  PRODUCT_FULLFILLMENT_FIELD_UPDATE,
  PRODUCT_PAYMENT_FIELD_UPDATE,
  PRODUCT_SETTING_FIELD_UPDATE,
  PRODUCT_THANKYOUPAGE_FIELD_UPDATE,
  REFUND_PRODUCT,
  TOGGLE_PRODUCT_AVAILABILITY,
  TOGGLE_PRODUCT_AVAILABILITY_FAILED,
  TOGGLE_PRODUCT_AVAILABILITY_SUCCESS,
  UPDATE_PRODUCT,
  UPDATE_PRODUCT_FAILED,
  UPDATE_PRODUCT_SUCCESS
} from '../constantsTypes';


/* New Product Actions */
export const onNewProductFieldChange = (field) => ({
  type: NEW_PRODUCT_FIELD_UPDATE,
  payload: field
});

export const createNewProduct = (product, meta) => ({
  type: CREATE_NEW_PRODUCT,
  payload: product,
  meta
});

export const newProductInvalidFields = (errors) => ({
  type: NEW_PRODUCT_INVALID_FORM,
  payload: errors
});


export const productCreated = (product) => ({
  type: PRODUCT_CREATED_SUCCESSFULLY,
  payload: product
});

export const productCreatingFailed = (message) => ({
  type: PRODUCT_CREATION_FAILED,
  payload: message
});


/* New Product Actions ends */


/* Product Fields Update Actions */

export const onCheckoutPageFieldChange = (field) => ({
  type: PRODUCT_CHECKOUT_FIELD_UPDATE,
  payload: field
});
export const onMandatoryDetailsFieldChange = (field) => ({
  type: PRODUCT_DETAILS_FIELD_UPDATE,
  payload: field
});
export const onProductBoostersFieldChange = (field) => ({
  type: PRODUCT_BOOSTERS_FIELD_UPDATE,
  payload: field
});
export const onProductPaymentFieldChange = (field) => ({
  type: PRODUCT_PAYMENT_FIELD_UPDATE,
  payload: field
});

export const onProductFullfillmentFieldChange = (field) => ({
  type: PRODUCT_FULLFILLMENT_FIELD_UPDATE,
  payload: field
});

export const onProductSettingsFieldChange = (field) => ({
  type: PRODUCT_SETTING_FIELD_UPDATE,
  payload: field
});
export const onProductBumpOfferFieldChange = (field) => ({
  type: PRODUCT_BUMPOFFER_FIELD_UPDATE,
  payload: field
});
export const onProductThankYouPageFieldChange = (field) => ({
  type: PRODUCT_THANKYOUPAGE_FIELD_UPDATE,
  payload: field
});

/* Product Fields Update Actions ends */


/* Update Products Details */
export const updateProduct = (product, meta) => ({
  type: UPDATE_PRODUCT,
  payload: product,
  meta
});

export const productUpdatedSuccessfully = (product) => ({
  type: UPDATE_PRODUCT_SUCCESS,
  payload: product
});

export const productUpdatedFailed = (message) => ({
  type: UPDATE_PRODUCT_FAILED,
  payload: message
});

/* Update Products Details Ends */


/* Getting product details */
export const getProduct = (url) => ({
  type: GET_PRODUCT_DETAILS,
  payload: url
});

export const getProductSuccess = (product) => ({
  type: GET_PRODUCT_SUCCESS,
  payload: product
});

export const getProductFailed = (product) => ({
  type: GET_PRODUCT_FAILED,
  payload: product
});

/* Getting product details Ends */

/* Deleting A Product */
export const deleteProduct = (id) => ({
  type: DELETE_USER_PRODUCT,
  payload: id
});

export const deleteProductSuccess = (product) => ({
  type: DELETE_USER_PRODUCT_SUCCESS,
  payload: product
});

export const deleteProductFailed = (product) => ({
  type: DELETE_USER_PRODUCT_FAILED,
  payload: product
});
/* Deleting A Product Ends */

/* Toggling Product Availability */
export const toggleProductAvailability = (availability) => ({
  type: TOGGLE_PRODUCT_AVAILABILITY,
  payload: availability
});
export const toggleProductAvailabilitySuccess = (availability) => ({
  type: TOGGLE_PRODUCT_AVAILABILITY_SUCCESS,
  payload: availability
});
export const toggleProductAvailabilityFailed = (message) => ({
  type: TOGGLE_PRODUCT_AVAILABILITY_FAILED,
  payload: message
});
export const refundProduct = (payload) => ({
  type: REFUND_PRODUCT,
  payload
});

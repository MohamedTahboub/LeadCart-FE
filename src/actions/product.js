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
  PRODUCT_CHECKOUT_FIELD_UPDATE,
  PRODUCT_BOOSTERS_FIELD_UPDATE,
  PRODUCT_PAYMENT_FIELD_UPDATE,
  PRODUCT_BUMPOFFER_FIELD_UPDATE,
  PRODUCT_SETTING_FIELD_UPDATE,
  DELETE_USER_PRODUCT,
  DELETE_USER_PRODUCT_SUCCESS,
  DELETE_USER_PRODUCT_FAILD,
  TOGGLE_PRODUCT_AVAILABILITY,
  TOGGLE_PRODUCT_AVAILABILITY_SUCCESS,
  TOGGLE_PRODUCT_AVAILABILITY_FAILD,

} from '../constantsTypes';


/* New Product Actions */
export const onNewProductFieldChange = (field) => ({
  type: NEW_PRODUCT_FIELD_UPDATE,
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
  type: PRODUCT_SETTING_FIELD_UPDATE,
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
  type: PRODUCT_BUMPOFFER_FIELD_UPDATE,
  payload: field
});

/* Product Fields Update Actions ends */


/* Update Products Details */
export const updateProduct = (product) => ({
  type: UPDATE_PRODUCT,
  payload: product
});

export const productUpdatedSuccessfuly = (product) => ({
  type: UPDATE_PRODUCT_SUCCESS,
  payload: product
});

export const productUpdatedFaild = (message) => ({
  type: UPDATE_PRODUCT_FAILD,
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

export const getProductFaild = (product) => ({
  type: GET_PRODUCT_FAILD,
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

export const deleteProductFaild = (product) => ({
  type: DELETE_USER_PRODUCT_FAILD,
  payload: product
});
/* Deleting A Product Ends */

/* Toggling Product Availability */
export const toggleProductAvailability = (availability) => ({
  type: TOGGLE_PRODUCT_AVAILABILITY,
  payload: availability
});
export const toggleProductAvailabilitySuccess = () => ({
  type: TOGGLE_PRODUCT_AVAILABILITY_SUCCESS
});
export const toggleProductAvailabilityFaild = (message) => ({
  type: TOGGLE_PRODUCT_AVAILABILITY_FAILD,
  payload: message
});
  /* Toggling Product Availability Ends */

// export const updateProductCheckoutDesign = (checkout) => ({
//   type: UPDATE_PRODUCT_CHECKOUT_TEMPLATE,
//   payload: checkout
// });
// export const updateProductCheckoutDesignSuccess = (checkout) => ({
//   type: UPDATE_PRODUCT_CHECKOUT_TEMPLATE_SUCCESS,
//   payload: checkout
// });
// export const updateProductCheckoutDesignFaild = (checkout) => ({
//   type: UPDATE_PRODUCT_CHECKOUT_TEMPLATE_FAILD,
//   payload: checkout
// });
// export const updateProductPayment = (payment) => ({
//   type: UPDATE_PRODUCT_PAYMENT_METHOD,
//   payload: payment
// });
// export const updateProductOrderBump = (bump) => ({
//   type: UPDATE_PRODUCT_BUMP_SETTING,
//   payload: bump
// });
// export const updateProductAdvanceSetting = (advanceSetting) => ({
//   type: UPDATE_PRODUCT_ADVANCE_SETTING,
//   payload: advanceSetting
// });


// export const addProductPaymentMethod = (method) => ({
//   type: ADD_PRODUCT_PAYMENT_METHOD,
//   payload: method
// });
// export const addProductPaymentMethodSuccess = (method) => ({
//   type: ADD_PRODUCT_PAYMENT_METHOD_SUCCESS,
//   payload: method
// });
// export const addProductPaymentMethodFaild = (method) => ({
//   type: ADD_PRODUCT_PAYMENT_METHOD_FAILD,
//   payload: method
// });


import {
  GET_USER_PRODUCTS,
  GET_USER_PRODUCTS_SUCCESS,
  GET_USER_PRODUCTS_FAILD
} from 'constantsTypes';


export const getUserProducts = () => ({
  type: GET_USER_PRODUCTS
});
export const getUserProductsSuccess = (products) => ({
  type: GET_USER_PRODUCTS_SUCCESS,
  payload: products
});
export const getUserProductsFaild = (message) => ({
  type: GET_USER_PRODUCTS_FAILD,
  payload: message
});

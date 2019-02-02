import {
  GET_USER_PRODUCTS,
  GET_USER_PRODUCTS_SUCCESS,
  GET_USER_PRODUCTS_FAILED
} from 'constantsTypes';


export const getUserProducts = () => ({
  type: GET_USER_PRODUCTS
});
export const getUserProductsSuccess = (products) => ({
  type: GET_USER_PRODUCTS_SUCCESS,
  payload: products
});
export const getUserProductsFailed = (message) => ({
  type: GET_USER_PRODUCTS_FAILED,
  payload: message
});

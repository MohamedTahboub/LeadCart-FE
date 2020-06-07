import {
  CREATE_BRAND,
  CREATE_BRAND_SUCCESS,
  CREATE_BRAND_FAILED,
  DELETE_BRAND,
  DELETE_BRAND_SUCCESS,
  DELETE_BRAND_FAILED,
  UPDATE_ACTIVE_BRAND,
  UPDATE_ACTIVE_BRAND_SUCCESS,
  UPDATE_ACTIVE_BRAND_FAILED,
  GET_USER_BRANDS,
} from '../constantsTypes';


export const getUserBrands = (brands) => ({
  type: GET_USER_BRANDS,
  payload: brands
});
export const createBrand = (brand, meta) => ({
  type: CREATE_BRAND,
  payload: brand,
  meta
});

export const createBrandSuccess = (brand) => ({
  type: CREATE_BRAND_SUCCESS,
  payload: brand,
});

export const createBrandFailed = (message) => ({
  type: CREATE_BRAND_FAILED,
  payload: message
});

export const deleteBrand = (brand, meta) => ({
  type: DELETE_BRAND,
  payload: brand,
  meta
});

export const deleteBrandSuccess = (brand) => ({
  type: DELETE_BRAND_SUCCESS,
  payload: brand,
});

export const deleteBrandFailed = (message) => ({
  type: DELETE_BRAND_FAILED,
  payload: message
});

export const updateActiveBrand = (brand, meta) => ({
  type: UPDATE_ACTIVE_BRAND,
  payload: brand,
  meta
});

export const updateActiveBrandSuccess = (brand) => ({
  type: UPDATE_ACTIVE_BRAND_SUCCESS,
  payload: brand,
});

export const updateActiveBrandFailed = (message) => ({
  type: UPDATE_ACTIVE_BRAND_FAILED,
  payload: message
});

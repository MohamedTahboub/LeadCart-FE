import {
  ADD_NEW_PRODUCTS_FONTS,
  ADD_NEW_PRODUCTS_FONTS_FAILED,
  ADD_NEW_PRODUCTS_FONTS_SUCCESS,
  DELETE_PRODUCTS_FONTS,
  DELETE_PRODUCTS_FONTS_FAILED,
  DELETE_PRODUCTS_FONTS_SUCCESS,
  GET_BRAND_FONTS
} from '../constantsTypes';


export const getBrandFonts = (payload) => ({
  type: GET_BRAND_FONTS,
  payload
});

export const addNewProductsFonts = (payload, meta) => ({
  type: ADD_NEW_PRODUCTS_FONTS,
  payload,
  meta
});

export const addNewProductsFontsSuccess = (payload) => ({
  type: ADD_NEW_PRODUCTS_FONTS_SUCCESS,
  payload
});

export const addNewProductsFontsFailed = (message) => ({
  type: ADD_NEW_PRODUCTS_FONTS_FAILED,
  payload: message
});


export const deleteProductsFonts = (payload, meta) => ({
  type: DELETE_PRODUCTS_FONTS,
  payload,
  meta
});

export const deleteProductsFontsSuccess = (payload) => ({
  type: DELETE_PRODUCTS_FONTS_SUCCESS,
  payload
});

export const deleteProductsFontsFailed = (message) => ({
  type: DELETE_PRODUCTS_FONTS_FAILED,
  payload: message
});


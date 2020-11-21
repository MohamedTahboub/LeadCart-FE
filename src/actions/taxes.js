import {
  ADD_NEW_TAX,
  ADD_NEW_TAX_FAILED,
  ADD_NEW_TAX_SUCCESS,
  DELETE_TAX,
  DELETE_TAX_FAILED,
  DELETE_TAX_SUCCESS,
  EDIT_TAX,
  EDIT_TAX_FAILED,
  EDIT_TAX_SUCCESS,
  GET_TAXES
} from '../constantsTypes';


export const getTaxes = (data, meta) => ({
  type: GET_TAXES,
  payload: data,
  meta
});


export const addNewTax = (data, meta) => ({
  type: ADD_NEW_TAX,
  payload: data,
  meta
});
export const addNewTaxSuccess = (data) => ({
  type: ADD_NEW_TAX_SUCCESS,
  payload: data
});
export const addNewTaxFailed = (message) => ({
  type: ADD_NEW_TAX_FAILED,
  payload: message
});


export const editTax = (data, meta) => ({
  type: EDIT_TAX,
  payload: data,
  meta
});
export const editTaxSuccess = (data) => ({
  type: EDIT_TAX_SUCCESS,
  payload: data
});
export const editTaxFailed = (message) => ({
  type: EDIT_TAX_FAILED,
  payload: message
});


export const deleteTax = (data, meta) => ({
  type: DELETE_TAX,
  payload: data,
  meta
});
export const deleteTaxSuccess = (data) => ({
  type: DELETE_TAX_SUCCESS,
  payload: data
});
export const deleteTaxFailed = (message) => ({
  type: DELETE_TAX_FAILED,
  payload: message
});


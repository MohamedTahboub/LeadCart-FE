import {
  ADD_NEW_TAX_ZONE,
  ADD_NEW_TAX_ZONE_FAILED,
  ADD_NEW_TAX_ZONE_SUCCESS,
  DELETE_TAX_ZONE,
  DELETE_TAX_ZONE_FAILED,
  DELETE_TAX_ZONE_SUCCESS,
  EDIT_TAX_ZONE,
  EDIT_TAX_ZONE_FAILED,
  EDIT_TAX_ZONE_SUCCESS,
  GET_TAX_ZONES
} from '../constantsTypes';


export const getTaxZones = (data, meta) => ({
  type: GET_TAX_ZONES,
  payload: data,
  meta
});


export const addNewTaxZone = (data, meta) => ({
  type: ADD_NEW_TAX_ZONE,
  payload: data,
  meta
});
export const addNewTaxZoneSuccess = (data) => ({
  type: ADD_NEW_TAX_ZONE_SUCCESS,
  payload: data
});
export const addNewTaxZoneFailed = (message) => ({
  type: ADD_NEW_TAX_ZONE_FAILED,
  payload: message
});


export const editTaxZone = (data, meta) => ({
  type: EDIT_TAX_ZONE,
  payload: data,
  meta
});
export const editTaxZoneSuccess = (data) => ({
  type: EDIT_TAX_ZONE_SUCCESS,
  payload: data
});
export const editTaxZoneFailed = (message) => ({
  type: EDIT_TAX_ZONE_FAILED,
  payload: message
});


export const deleteTaxZone = (data, meta) => ({
  type: DELETE_TAX_ZONE,
  payload: data,
  meta
});
export const deleteTaxZoneSuccess = (data) => ({
  type: DELETE_TAX_ZONE_SUCCESS,
  payload: data
});
export const deleteTaxZoneFailed = (message) => ({
  type: DELETE_TAX_ZONE_FAILED,
  payload: message
});


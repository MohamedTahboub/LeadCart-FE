import {
  GET_UPSELLS,
  GET_UPSELLS_SUCCESS,
  GET_UPSELLS_FAILED,
  CREATE_UPSELL,
  CREATE_UPSELL_SUCCESS,
  CREATE_UPSELL_FAILED,
  UPDATE_UPSELL,
  UPDATE_UPSELL_SUCCESS,
  UPDATE_UPSELL_FAILED,
  DELETE_UPSELL,
  DELETE_UPSELL_SUCCESS,
  DELETE_UPSELL_FAILED,
} from 'constantsTypes';


export const getUpsells = (upsells) => ({
  type: GET_UPSELLS,
  payload: upsells
});
export const getUpsellsSuccess = (upsells) => ({
  type: GET_UPSELLS_SUCCESS,
  payload: upsells
});
export const getUpsellsFailed = (upsells) => ({
  type: GET_UPSELLS_FAILED,
  payload: upsells
});

export const createUpsell = (upsell) => ({
  type: CREATE_UPSELL,
  payload: upsell
});

export const createUpsellSuccess = (upsell) => ({
  type: CREATE_UPSELL_SUCCESS,
  payload: upsell
});
export const createUpsellFailed = (message) => ({
  type: CREATE_UPSELL_FAILED,
  payload: message
});

export const updateUpsell = (upsell) => ({
  type: UPDATE_UPSELL,
  payload: upsell
});

export const updateUpsellSuccess = (upsell) => ({
  type: UPDATE_UPSELL_SUCCESS,
  payload: upsell
});

export const updateUpsellFailed = (message) => ({
  type: UPDATE_UPSELL_FAILED,
  payload: message
});

export const deleteUpsell = (id) => ({
  type: DELETE_UPSELL,
  payload: id
});
export const deleteUpsellSuccess = (id) => ({
  type: DELETE_UPSELL_SUCCESS,
  payload: id
});
export const deleteUpsellFailed = (message) => ({
  type: DELETE_UPSELL_FAILED,
  payload: message
});

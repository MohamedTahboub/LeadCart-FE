import {
  GET_UPSELLS,
  CREATE_UPSELL,
  CREATE_UPSELL_SUCCESS,
  CREATE_UPSELL_FAILD,
  UPDATE_UPSELL,
  UPDATE_UPSELL_SUCCESS,
  UPDATE_UPSELL_FAILD,
  DELETE_UPSELL,
  DELETE_UPSELL_SUCCESS,
  DELETE_UPSELL_FAILD,
} from 'constantsTypes';


export const getUpsells = () => ({
  type: GET_UPSELLS
});

export const createUpsell = (upsell) => ({
  type: CREATE_UPSELL,
  payload: upsell
});

export const createUpsellSuccess = (upsell) => ({
  type: CREATE_UPSELL_SUCCESS,
  payload: upsell
});
export const createUpsellFaild = (message) => ({
  type: CREATE_UPSELL_FAILD,
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

export const updateUpsellFaild = (message) => ({
  type: UPDATE_UPSELL_FAILD,
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
export const deleteUpsellFaild = (message) => ({
  type: DELETE_UPSELL_FAILD,
  payload: message
});

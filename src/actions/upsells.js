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
  CHANGE_UPSELL_STATE,
  CHANGE_UPSELL_STATE_SUCCESS,
  CHANGE_UPSELL_STATE_FAILED
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

export const createUpsell = (upsell, meta) => ({
  type: CREATE_UPSELL,
  payload: upsell,
  meta
});

export const createUpsellSuccess = (upsell) => ({
  type: CREATE_UPSELL_SUCCESS,
  payload: upsell
});
export const createUpsellFailed = (message) => ({
  type: CREATE_UPSELL_FAILED,
  payload: message
});

export const updateUpsell = (upsell, meta) => ({
  type: UPDATE_UPSELL,
  payload: upsell,
  meta
});

export const updateUpsellSuccess = (upsell) => ({
  type: UPDATE_UPSELL_SUCCESS,
  payload: upsell
});

export const updateUpsellFailed = (message) => ({
  type: UPDATE_UPSELL_FAILED,
  payload: message
});

export const deleteUpsell = (id, meta) => ({
  type: DELETE_UPSELL,
  payload: id,
  meta
});
export const deleteUpsellSuccess = (id) => ({
  type: DELETE_UPSELL_SUCCESS,
  payload: id
});
export const deleteUpsellFailed = (message) => ({
  type: DELETE_UPSELL_FAILED,
  payload: message
});


export const changeUpsellState = (upsell) => ({
  type: CHANGE_UPSELL_STATE,
  payload: upsell
});
export const changeUpsellStateSuccess = (upsell) => ({
  type: CHANGE_UPSELL_STATE_SUCCESS,
  payload: upsell
});
export const changeUpsellStateFailed = (upsell) => ({
  type: CHANGE_UPSELL_STATE_FAILED,
  payload: upsell
});


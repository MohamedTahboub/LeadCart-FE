import {
  GET_FULFILLMENT,
  GET_FULFILLMENT_SUCCESS,
  GET_FULFILLMENT_FAILED,
  CREATE_FULFILLMENT,
  CREATE_FULFILLMENT_SUCCESS,
  CREATE_FULFILLMENT_FAILED,
  UPDATE_FULFILLMENT,
  UPDATE_FULFILLMENT_SUCCESS,
  UPDATE_FULFILLMENT_FAILED,
  DELETE_FULFILLMENT,
  DELETE_FULFILLMENT_SUCCESS,
  DELETE_FULFILLMENT_FAILED,
  CHANGE_FULFILLMENT_STATE,
  CHANGE_FULFILLMENT_STATE_SUCCESS,
  CHANGE_FULFILLMENT_STATE_FAILED
} from 'constantsTypes';


export const getFulfillment = (fulfillments) => ({
  type: GET_FULFILLMENT,
  payload: fulfillments
});
export const getFulfillmentSuccess = (fulfillments) => ({
  type: GET_FULFILLMENT_SUCCESS,
  payload: fulfillments
});
export const getFulfillmentFailed = (message) => ({
  type: GET_FULFILLMENT_FAILED,
  payload: message
});

export const createFulfillment = (fulfillment, meta) => ({
  type: CREATE_FULFILLMENT,
  payload: fulfillment,
  meta
});
export const createFulfillmentSuccess = (fulfillment) => ({
  type: CREATE_FULFILLMENT_SUCCESS,
  payload: fulfillment
});
export const createFulfillmentFailed = (message) => ({
  type: CREATE_FULFILLMENT_FAILED,
  payload: message
});


export const updateFulfillment = (fulfillment, meta) => ({
  type: UPDATE_FULFILLMENT,
  payload: fulfillment,
  meta
});
export const updateFulfillmentSuccess = (fulfillment) => ({
  type: UPDATE_FULFILLMENT_SUCCESS,
  payload: fulfillment
});
export const updateFulfillmentFailed = (message) => ({
  type: UPDATE_FULFILLMENT_FAILED,
  payload: message
});


export const deleteFulfillment = (id, meta) => ({
  type: DELETE_FULFILLMENT,
  payload: id,
  meta
});
export const deleteFulfillmentSuccess = (id) => ({
  type: DELETE_FULFILLMENT_SUCCESS,
  payload: id
});
export const deleteFulfillmentFailed = (message) => ({
  type: DELETE_FULFILLMENT_FAILED,
  payload: message
});


export const changeFulfillmentState = (fulfillment) => ({
  type: CHANGE_FULFILLMENT_STATE,
  payload: fulfillment
});
export const changeFulfillmentStateSuccess = (fulfillment) => ({
  type: CHANGE_FULFILLMENT_STATE_SUCCESS,
  payload: fulfillment
});
export const changeFulfillmentStateFailed = (message) => ({
  type: CHANGE_FULFILLMENT_STATE_FAILED,
  payload: message
});


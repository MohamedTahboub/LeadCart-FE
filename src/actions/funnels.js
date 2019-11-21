import {
  CREATE_FUNNEL,
  CREATE_FUNNEL_SUCCESS,
  CREATE_FUNNEL_FAILED,
  UPDATE_FUNNEL,
  UPDATE_FUNNEL_SUCCESS,
  UPDATE_FUNNEL_FAILED,
  DELETE_FUNNEL,
  DELETE_FUNNEL_SUCCESS,
  DELETE_FUNNEL_FAILED,
  GET_FUNNELS
} from '../constantsTypes';


export const getFunnels = (funnels, meta) => ({
  type: GET_FUNNELS,
  payload: funnels,
  meta
});

export const createFunnel = (funnel, meta) => ({
  type: CREATE_FUNNEL,
  payload: funnel,
  meta
});
export const createFunnelSuccess = (funnel) => ({
  type: CREATE_FUNNEL_SUCCESS,
  payload: funnel
});
export const createFunnelFailed = (message) => ({
  type: CREATE_FUNNEL_FAILED,
  payload: message
});


export const updateFunnel = (funnel, meta) => ({
  type: UPDATE_FUNNEL,
  payload: funnel,
  meta
});
export const updateFunnelSuccess = (funnel) => ({
  type: UPDATE_FUNNEL_SUCCESS,
  payload: funnel
});
export const updateFunnelFailed = (message) => ({
  type: UPDATE_FUNNEL_FAILED,
  payload: message
});


export const deleteFunnel = (funnelId, meta) => ({
  type: DELETE_FUNNEL,
  payload: funnelId,
  meta
});

export const deleteFunnelSuccess = (funnelId) => ({
  type: DELETE_FUNNEL_SUCCESS,
  payload: funnelId
});

export const deleteFunnelFailed = (message) => ({
  type: DELETE_FUNNEL_FAILED,
  payload: message
});

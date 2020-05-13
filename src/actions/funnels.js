import {
  CREATE_FUNNEL,
  CREATE_FUNNEL_FAILED,
  CREATE_FUNNEL_RULE,
  CREATE_FUNNEL_RULE_FAILED,
  CREATE_FUNNEL_RULE_SUCCESS,
  CREATE_FUNNEL_SUCCESS,
  DELETE_FUNNEL,
  DELETE_FUNNEL_FAILED,
  DELETE_FUNNEL_RULE,
  DELETE_FUNNEL_RULE_FAILED,
  DELETE_FUNNEL_RULE_SUCCESS,
  DELETE_FUNNEL_SUCCESS,
  GET_FUNNELS,
  UPDATE_FUNNEL,
  UPDATE_FUNNEL_FAILED,
  UPDATE_FUNNEL_RULE,
  UPDATE_FUNNEL_RULE_FAILED,
  UPDATE_FUNNEL_RULE_SUCCESS,
  UPDATE_FUNNEL_SUCCESS


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


export const createFunnelRule = (rule, meta) => ({
  type: CREATE_FUNNEL_RULE,
  payload: rule,
  meta
});

export const createFunnelRuleSuccess = (rule) => ({
  type: CREATE_FUNNEL_RULE_SUCCESS,
  payload: rule
});

export const createFunnelRuleFailed = (message) => ({
  type: CREATE_FUNNEL_RULE_FAILED,
  payload: message
});
export const updateFunnelRule = (rule, meta) => ({
  type: UPDATE_FUNNEL_RULE,
  payload: rule,
  meta
});

export const updateFunnelRuleSuccess = (rule) => ({
  type: UPDATE_FUNNEL_RULE_SUCCESS,
  payload: rule
});

export const updateFunnelRuleFailed = (message) => ({
  type: UPDATE_FUNNEL_RULE_FAILED,
  payload: message
});
export const deleteFunnelRule = (rule, meta) => ({
  type: DELETE_FUNNEL_RULE,
  payload: rule,
  meta
});

export const deleteFunnelRuleSuccess = (rule) => ({
  type: DELETE_FUNNEL_RULE_SUCCESS,
  payload: rule
});

export const deleteFunnelRuleFailed = (message) => ({
  type: DELETE_FUNNEL_RULE_FAILED,
  payload: message
});

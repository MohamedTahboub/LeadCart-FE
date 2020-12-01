import {
  ADD_NEW_SHIPPING_RULE,
  ADD_NEW_SHIPPING_RULE_FAILED,
  ADD_NEW_SHIPPING_RULE_SUCCESS,
  DELETE_SHIPPING_RULE,
  DELETE_SHIPPING_RULE_FAILED,
  DELETE_SHIPPING_RULE_SUCCESS,
  EDIT_SHIPPING_RULE,
  EDIT_SHIPPING_RULE_FAILED,
  EDIT_SHIPPING_RULE_SUCCESS,
  GET_SHIPPING_RULES
} from '../constantsTypes';


export const getShippingRules = (data, meta) => ({
  type: GET_SHIPPING_RULES,
  payload: data,
  meta
});


export const addNewShippingRule = (data, meta) => ({
  type: ADD_NEW_SHIPPING_RULE,
  payload: data,
  meta
});
export const addNewShippingRuleSuccess = (data) => ({
  type: ADD_NEW_SHIPPING_RULE_SUCCESS,
  payload: data
});
export const addNewShippingRuleFailed = (message) => ({
  type: ADD_NEW_SHIPPING_RULE_FAILED,
  payload: message
});


export const editShippingRule = (data, meta) => ({
  type: EDIT_SHIPPING_RULE,
  payload: data,
  meta
});
export const editShippingRuleSuccess = (data) => ({
  type: EDIT_SHIPPING_RULE_SUCCESS,
  payload: data
});
export const editShippingRuleFailed = (message) => ({
  type: EDIT_SHIPPING_RULE_FAILED,
  payload: message
});


export const deleteShippingRule = (data, meta) => ({
  type: DELETE_SHIPPING_RULE,
  payload: data,
  meta
});
export const deleteShippingRuleSuccess = (data) => ({
  type: DELETE_SHIPPING_RULE_SUCCESS,
  payload: data
});
export const deleteShippingRuleFailed = (message) => ({
  type: DELETE_SHIPPING_RULE_FAILED,
  payload: message
});


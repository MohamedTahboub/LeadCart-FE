import {
  ADD_NEW_SHIPPING_ROLE,
  ADD_NEW_SHIPPING_ROLE_FAILED,
  ADD_NEW_SHIPPING_ROLE_SUCCESS,
  DELETE_SHIPPING_ROLE,
  DELETE_SHIPPING_ROLE_FAILED,
  DELETE_SHIPPING_ROLE_SUCCESS,
  EDIT_SHIPPING_ROLE,
  EDIT_SHIPPING_ROLE_FAILED,
  EDIT_SHIPPING_ROLE_SUCCESS,
  GET_SHIPPING_ROLES
} from '../constantsTypes';


export const getShippingRoles = (data, meta) => ({
  type: GET_SHIPPING_ROLES,
  payload: data,
  meta
});


export const addNewShippingRole = (data, meta) => ({
  type: ADD_NEW_SHIPPING_ROLE,
  payload: data,
  meta
});
export const addNewShippingRoleSuccess = (data) => ({
  type: ADD_NEW_SHIPPING_ROLE_SUCCESS,
  payload: data
});
export const addNewShippingRoleFailed = (message) => ({
  type: ADD_NEW_SHIPPING_ROLE_FAILED,
  payload: message
});


export const editShippingRole = (data, meta) => ({
  type: EDIT_SHIPPING_ROLE,
  payload: data,
  meta
});
export const editShippingRoleSuccess = (data) => ({
  type: EDIT_SHIPPING_ROLE_SUCCESS,
  payload: data
});
export const editShippingRoleFailed = (message) => ({
  type: EDIT_SHIPPING_ROLE_FAILED,
  payload: message
});


export const deleteShippingRole = (data, meta) => ({
  type: DELETE_SHIPPING_ROLE,
  payload: data,
  meta
});
export const deleteShippingRoleSuccess = (data) => ({
  type: DELETE_SHIPPING_ROLE_SUCCESS,
  payload: data
});
export const deleteShippingRoleFailed = (message) => ({
  type: DELETE_SHIPPING_ROLE_FAILED,
  payload: message
});


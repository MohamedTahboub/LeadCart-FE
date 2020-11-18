import {
  ADD_NEW_DESTINATION_ZONE,
  ADD_NEW_DESTINATION_ZONE_FAILED,
  ADD_NEW_DESTINATION_ZONE_SUCCESS,
  DELETE_DESTINATION_ZONE,
  DELETE_DESTINATION_ZONE_FAILED,
  DELETE_DESTINATION_ZONE_SUCCESS,
  EDIT_DESTINATION_ZONE,
  EDIT_DESTINATION_ZONE_FAILED,
  EDIT_DESTINATION_ZONE_SUCCESS,
  GET_DESTINATION_ZONES
} from '../constantsTypes';


export const getDestinationZones = (data, meta) => ({
  type: GET_DESTINATION_ZONES,
  payload: data,
  meta
});


export const addNewDestinationZone = (data, meta) => ({
  type: ADD_NEW_DESTINATION_ZONE,
  payload: data,
  meta
});
export const addNewDestinationZoneSuccess = (data) => ({
  type: ADD_NEW_DESTINATION_ZONE_SUCCESS,
  payload: data
});
export const addNewDestinationZoneFailed = (message) => ({
  type: ADD_NEW_DESTINATION_ZONE_FAILED,
  payload: message
});


export const editDestinationZone = (data, meta) => ({
  type: EDIT_DESTINATION_ZONE,
  payload: data,
  meta
});
export const editDestinationZoneSuccess = (data) => ({
  type: EDIT_DESTINATION_ZONE_SUCCESS,
  payload: data
});
export const editDestinationZoneFailed = (message) => ({
  type: EDIT_DESTINATION_ZONE_FAILED,
  payload: message
});


export const deleteDestinationZone = (data, meta) => ({
  type: DELETE_DESTINATION_ZONE,
  payload: data,
  meta
});
export const deleteDestinationZoneSuccess = (data) => ({
  type: DELETE_DESTINATION_ZONE_SUCCESS,
  payload: data
});
export const deleteDestinationZoneFailed = (message) => ({
  type: DELETE_DESTINATION_ZONE_FAILED,
  payload: message
});


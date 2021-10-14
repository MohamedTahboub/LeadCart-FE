import {
  GET_BRAND_PROSPECTS,
  GET_BRAND_PROSPECTS_FAILED,
  GET_BRAND_PROSPECTS_SUCCESS
} from 'constantsTypes';


export const getBrandProspects = (leads, meta) => ({
  type: GET_BRAND_PROSPECTS,
  payload: leads,
  meta
});
export const getBrandProspectsSuccess = (leads) => ({
  type: GET_BRAND_PROSPECTS_SUCCESS,
  payload: leads
});
export const getBrandProspectsFailed = (errors) => ({
  type: GET_BRAND_PROSPECTS_FAILED,
  payload: errors
});


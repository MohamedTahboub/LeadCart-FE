import { API_REQUEST } from 'constantsTypes';


export const apiRequest = (metaDate) => ({
  type: API_REQUEST,
  payload: metaDate
});

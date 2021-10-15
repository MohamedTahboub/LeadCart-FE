import { GET_BRAND_PROSPECTS_SUCCESS } from '../constantsTypes';


const initialState = [];


export default (state = initialState, { type, payload }) => {
  switch (type) {
  case GET_BRAND_PROSPECTS_SUCCESS:


    return payload || [];
  default: return state;
  }
};


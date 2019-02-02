import {
  GET_UPSELLS_SUCCESS,
  GET_UPSELLS_FAILED
} from 'constantsTypes';


const initialState = {
  upsell: {},
  list: [],
  errors: ''
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_UPSELLS_SUCCESS:
      return {
        ...state,
        list: payload
      };
    case GET_UPSELLS_FAILED:
      return {
        ...state,
        errors: {
          ...state,
          message: payload
        }
      }
    default: return state;
  }
};

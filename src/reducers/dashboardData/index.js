import {
  GET_DASHBOARD_DATA_SUCCESS,
} from '../../constantsTypes';

const initialState = [];


export default (state = initialState, { type, payload }) => {
  switch (type) {
  case GET_DASHBOARD_DATA_SUCCESS:
    return payload;

  default: return state;
  }
};

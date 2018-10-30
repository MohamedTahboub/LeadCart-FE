import { TOGGLE_LOADING } from 'constantsTypes';


const initialState = false;

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case TOGGLE_LOADING: return !state;
  default: return state;
  }
};

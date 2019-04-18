import {
  START_LOADING,
  END_LOADING
} from 'constantsTypes';


const initialState = false;

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case START_LOADING: return true;
    case END_LOADING: return false;
    default: return state;
  }
};

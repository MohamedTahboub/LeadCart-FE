import {
  END_LOADING,
  START_LOADING
} from 'constantsTypes';


const initialState = false;

export default (state = initialState, { type }) => {
  switch (type) {
  case START_LOADING: return true;
  case END_LOADING: return false;
  default: return state;
  }
};

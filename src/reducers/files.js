import { UPLOAD_FILE_SUCCESS, UPLOAD_FILE_FAILED, DELETE_FILE } from 'constantsTypes';


const initialState = {
  fileLink: '',
  product: '',
  error: ''
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case UPLOAD_FILE_SUCCESS: return { ...state, [payload.source]: payload.url };
  case UPLOAD_FILE_FAILED: return { ...state, error: payload };
  case DELETE_FILE: return { ...state, [payload.source]: '' };
  default: return state;
  }
};

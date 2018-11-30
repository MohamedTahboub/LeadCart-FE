import { UPLOAD_FILE_SUCCESS, UPLOAD_FILE_FAILD } from 'constantsTypes';


const initialState = {
  fileLink: '',
  error: ''
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case UPLOAD_FILE_SUCCESS: return { ...state, fileLink: payload.url };
  case UPLOAD_FILE_FAILD: return { ...state, error: payload };
  default: return state;
  }
};

import { UPLOAD_FILE_SUCCESS, UPLOAD_FILE_FAILD, DELETE_FILE } from 'constantsTypes';


const initialState = {
  upsell: {},
  list: '',
  errors: ''
};

export default (state = initialState, { type, payload }) => state;

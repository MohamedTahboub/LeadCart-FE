import {
  UPLOAD_FILE,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_FAILD
} from 'constantsTypes';


export const uploadFile = (file) => ({
  type: UPLOAD_FILE,
  payload: file
});
export const uploadFileSuccess = (file) => ({
  type: UPLOAD_FILE_SUCCESS,
  payload: file
});
export const uploadFileFaild = (message) => ({
  type: UPLOAD_FILE_FAILD,
  payload: message
});

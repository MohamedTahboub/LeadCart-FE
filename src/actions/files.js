import {
  UPLOAD_FILE,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_FAILED,
  DELETE_FILE
} from 'constantsTypes';


export const uploadFile = (file, meta) => ({
  type: UPLOAD_FILE,
  payload: file,
  meta
});
export const deleteFile = (source) => ({
  type: DELETE_FILE,
  payload: source
});
export const uploadFileSuccess = (file) => ({
  type: UPLOAD_FILE_SUCCESS,
  payload: file
});
export const uploadFileFailed = (message) => ({
  type: UPLOAD_FILE_FAILED,
  payload: message
});

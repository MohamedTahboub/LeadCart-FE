import { UPLOAD_FILE } from 'constantsTypes';
import { apiRequest } from 'actions/apiRequest';
import { uploadFileSuccess, uploadFileFaild } from 'actions/files';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== UPLOAD_FILE) return next(action);

  const file = new FormData();
  file.append('file', action.payload.file);
  file.append('type', action.payload.type);

  dispatch(apiRequest({
    options: {
      method: 'post',
      uri: '/api/file/upload',
      body: file
    },
    onSuccess: uploadFileSuccess,
    onFaild: uploadFileFaild
  }));
};

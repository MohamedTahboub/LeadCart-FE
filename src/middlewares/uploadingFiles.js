import { UPLOAD_FILE } from 'constantsTypes';
import { apiRequest } from 'actions/apiRequest';
import { uploadFileSuccess, uploadFileFailed } from 'actions/files';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== UPLOAD_FILE) return next(action);

  const file = new FormData();
  file.append('file', action.payload.file);
  file.append('type', action.payload.type);

  const castSuccess = (data) => {
    const { meta: { onSuccess } = {} } = action
    onSuccess && onSuccess(data.url)
    return uploadFileSuccess({ source: action.payload.source, ...data })
  };

  dispatch(apiRequest({
    options: {
      method: 'post',
      uri: '/api/file/upload',
      body: file
    },
    onSuccess: castSuccess, // .bind(this, action.payload.type),
    onFailed: uploadFileFailed
  }));
};

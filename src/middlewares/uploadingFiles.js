import { UPLOAD_FILE } from 'constantsTypes';
import { apiRequest } from 'actions/apiRequest';
import { uploadFileFailed, uploadFileSuccess } from 'actions/files';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== UPLOAD_FILE) return next(action);

  const { meta = {}, payload } = action;
  const file = new FormData();
  file.append('file', payload.file, payload.fileName);
  file.append('type', payload.type);

  const castSuccess = (data) => {
    const { meta: { onSuccess } = {} } = action;
    onSuccess && onSuccess(data.url);
    return uploadFileSuccess({ source: payload.source, ...data, options: meta.options });
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

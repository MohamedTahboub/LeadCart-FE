import { UPDATE_USER_PROFILE_IMAGE } from 'constantsTypes';
import { updateUserProfileImageSuccess, updateUserProfileImageFaild } from 'actions/account';

import { apiRequest } from 'actions/apiRequest';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== UPDATE_USER_PROFILE_IMAGE) return next(action);

  dispatch(apiRequest({
    options: {
      method: 'PUT',
      body: { profileImage: action.payload },
      uri: '/api/users/image',
      contentType: 'json'
    },
    onSuccess: updateUserProfileImageSuccess,
    onFaild: updateUserProfileImageFaild
  }));
};

import { apiRequest } from 'actions/apiRequest';
import {
  DELETE_TRANSLATION_LANGUAGE
} from '../../constantsTypes';

import {
  deleteTranslationLanguageSuccess,
  deleteTranslationLanguageFailed,
} from '../../actions/translations';


export default ({ dispatch }) => (next) => async (action) => {
  if (action.type !== DELETE_TRANSLATION_LANGUAGE) return next(action);

  const { payload, meta = {} } = action;

  dispatch(apiRequest({
    options: {
      method: 'DELETE',
      uri: '/api/users/translations',
      body: payload,
      contentType: 'json'
    },
    onSuccess: (args) => {
      meta.onSuccess && meta.onSuccess(args);
      return deleteTranslationLanguageSuccess(action.payload);
    },
    onFailed: (message) => {
      meta.onFailed && meta.onFailed(message);
      return deleteTranslationLanguageFailed(message);
    }
  }));
};

import { apiRequest } from 'actions/apiRequest';
import {
  UPDATE_TRANSLATION_LANGUAGE
} from '../../constantsTypes';

import {
  updateTranslationLanguageSuccess,
  updateTranslationLanguageFailed,
} from '../../actions/translations';


export default ({ dispatch }) => (next) => async (action) => {
  if (action.type !== UPDATE_TRANSLATION_LANGUAGE) return next(action);

  const { payload, meta = {} } = action;

  dispatch(apiRequest({
    options: {
      method: 'PUT',
      uri: '/api/brands/languages',
      body: payload,
      contentType: 'json'
    },
    onSuccess: (args) => {
      meta.onSuccess && meta.onSuccess(args);
      return updateTranslationLanguageSuccess(action.payload);
    },
    onFailed: (message) => {
      meta.onFailed && meta.onFailed(message);
      return updateTranslationLanguageFailed(message);
    }
  }));
};

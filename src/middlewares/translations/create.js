import { apiRequest } from 'actions/apiRequest';
import {
  CREATED_TRANSLATION_LANGUAGE
} from '../../constantsTypes';

import {
  createTranslationLanguageSuccess,
  createTranslationLanguageFailed,
} from '../../actions/translations';


export default ({ dispatch }) => (next) => async (action) => {
  if (action.type !== CREATED_TRANSLATION_LANGUAGE) return next(action);

  const { payload, meta = {} } = action;

  dispatch(apiRequest({
    options: {
      method: 'POST',
      uri: '/api/languages',
      body: payload,
      contentType: 'json'
    },
    onSuccess: (args) => {
      meta.onSuccess && meta.onSuccess(args);
      return createTranslationLanguageSuccess(action.payload);
    },
    onFailed: (message) => {
      meta.onFailed && meta.onFailed(message);
      return createTranslationLanguageFailed(message);
    }
  }));
};

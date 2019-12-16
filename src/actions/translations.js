import {
  UPDATE_TRANSLATIONS_LANGUAGES,
  CREATED_TRANSLATION_LANGUAGE,
  CREATED_TRANSLATION_LANGUAGE_SUCCESS,
  CREATED_TRANSLATION_LANGUAGE_FAILED,
  UPDATE_TRANSLATION_LANGUAGE,
  UPDATE_TRANSLATION_LANGUAGE_SUCCESS,
  UPDATE_TRANSLATION_LANGUAGE_FAILED,
  DELETE_TRANSLATION_LANGUAGE,
  DELETE_TRANSLATION_LANGUAGE_SUCCESS,
  DELETE_TRANSLATION_LANGUAGE_FAILED,

} from '../constantsTypes';

export const getTranslationsLanguages = (languages) => ({
  type: UPDATE_TRANSLATIONS_LANGUAGES,
  payload: languages
});

export const createTranslationLanguage = (language, meta) => ({
  type: CREATED_TRANSLATION_LANGUAGE,
  payload: language,
  meta
});
export const createTranslationLanguageSuccess = (language) => ({
  type: CREATED_TRANSLATION_LANGUAGE_SUCCESS,
  payload: language
});
export const createTranslationLanguageFailed = (message) => ({
  type: CREATED_TRANSLATION_LANGUAGE_FAILED,
  payload: message
});

export const updateTranslationLanguage = (language, meta) => ({
  type: UPDATE_TRANSLATION_LANGUAGE,
  payload: language,
  meta
});
export const updateTranslationLanguageSuccess = (language) => ({
  type: UPDATE_TRANSLATION_LANGUAGE_SUCCESS,
  payload: language
});
export const updateTranslationLanguageFailed = (message) => ({
  type: UPDATE_TRANSLATION_LANGUAGE_FAILED,
  payload: message
});

export const deleteTranslationLanguage = (languageId, meta) => ({
  type: DELETE_TRANSLATION_LANGUAGE,
  payload: languageId,
  meta
});
export const deleteTranslationLanguageSuccess = (languageId) => ({
  type: DELETE_TRANSLATION_LANGUAGE_SUCCESS,
  payload: languageId
});
export const deleteTranslationLanguageFailed = (message) => ({
  type: DELETE_TRANSLATION_LANGUAGE_FAILED,
  payload: message
});

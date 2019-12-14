import defaultLanguage from 'data/defaultLanguage.json';

import {
  UPDATE_TRANSLATIONS_LANGUAGES,
  CREATED_TRANSLATION_LANGUAGE_SUCCESS,
  UPDATE_TRANSLATION_LANGUAGE_SUCCESS,
  DELETE_TRANSLATION_LANGUAGE_SUCCESS,
} from 'constantsTypes';

const initialState = [defaultLanguage];


export default (state = initialState, { type, payload }) => {
  switch (type) {
    case UPDATE_TRANSLATIONS_LANGUAGES:
      return payload || [];

    case CREATED_TRANSLATION_LANGUAGE_SUCCESS:
      return [...state, payload];

    case UPDATE_TRANSLATION_LANGUAGE_SUCCESS:
      return state.map((language) => {
        if (language._id === payload.languageId)
          return { ...language, ...payload.language };
        return language;
      });

    case DELETE_TRANSLATION_LANGUAGE_SUCCESS:
      return state.filter((language) => language._id !== payload);

    default: return state;
  }
};


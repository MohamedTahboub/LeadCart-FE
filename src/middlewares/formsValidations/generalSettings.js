
import { saveUserGeneralSettingsFaild } from 'actions/settings';

import { SAVE_USER_GENERAL_SETTINGS } from 'constantsTypes';

import { Rules, Vaidator } from '../helpers/validators';

export default ({ dispatch, getState }) => (next) => (action) => {
  if (action.type !== SAVE_USER_GENERAL_SETTINGS) return next(action);

  const { settings: { generalModel } } = getState();

  const rules = {
    name: [Rules.isRequired]
  };

  const isInvalid = Vaidator(generalModel, rules);

  if (isInvalid) dispatch(saveUserGeneralSettingsFaild(isInvalid));
  else next(action);
};


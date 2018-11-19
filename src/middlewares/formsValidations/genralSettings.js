
import { saveUserGenralSettingsFaild } from 'actions/settings';

import { SAVE_USER_GENRAL_SETTINGS } from 'constantsTypes';

import { Rules, Vaidator } from '../helpers/validators';

export default ({ dispatch, getState }) => (next) => (action) => {
  if (action.type !== SAVE_USER_GENRAL_SETTINGS) return next(action);

  const { settings: { genralModel } } = getState();

  const rules = {
    name: [Rules.isRequired],
    country: [Rules.isRequired],
    currency: [Rules.isRequired],
    darkLogo: [Rules.url],
    downloadButtonText: [Rules.isRequired],
    firePixel: [Rules.bool],
    footerScript: [Rules.isRequired],
    lightLogo: [Rules.url],
    productExpirationDays: [Rules.isRequired],
    purchaseCompletion: [Rules.isRequired],
    timeZone: [Rules.isRequired]
  };

  const isInvalid = Vaidator(genralModel, rules);

  if (isInvalid) dispatch(saveUserGenralSettingsFaild(isInvalid));
  else next(action);
};


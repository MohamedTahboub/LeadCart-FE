import { SAVE_USER_GENERAL_SETTINGS } from 'constantsTypes';
import modeler from '../helpers/modeler';
import { userSettings } from '../helpers/models';


export default ({ dispatch, getState }) => (next) => (action) => {
  if (action.type !== SAVE_USER_GENERAL_SETTINGS) return next(action);

  const generalSettings = getState().settings.generalModel;
  action.payload = modeler(generalSettings, userSettings);
  next(action);
};

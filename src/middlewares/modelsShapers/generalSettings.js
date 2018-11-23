import { SAVE_USER_GENERAL_SETTINGS } from 'constantsTypes';
import modeler from '../helpers/modeler';
import { settings } from '../helpers/models';


export default ({ dispatch, getState }) => (next) => (action) => {
  if (action.type !== SAVE_USER_GENERAL_SETTINGS) return next(action);

  const generalSettings = getState().settings.generalModel;
  action.payload = modeler(generalSettings, settings);
  next(action);
};

import { SAVE_USER_GENRAL_SETTINGS } from 'constantsTypes';
import modeler from '../helpers/modeler';
import { settings } from '../helpers/models';


export default ({ dispatch, getState }) => (next) => (action) => {
  if (action.type !== SAVE_USER_GENRAL_SETTINGS) return next(action);

  const genralSettings = getState().settings.genralModel;
  action.payload = modeler(genralSettings, settings);
  next(action);
};

import {
  CHANGE_ACCOUNT_DETAILS,
  CHANGE_ACCOUNT_PASSWORD
} from 'constantsTypes';
import {
  onChangeAccountDetailsFaild,
  onChangeAccounPasswordFaild
} from 'actions/account';
import { Rules, Vaidator } from '../helpers/validators';


export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== CHANGE_ACCOUNT_DETAILS && action.type !== CHANGE_ACCOUNT_PASSWORD) return next(action);

  let rules = {
    firstName: [Rules.isRequired],
    lastName: [Rules.isRequired],
    email: [Rules.email]
  };

  let faildAction = onChangeAccountDetailsFaild;

  if (action.type === CHANGE_ACCOUNT_PASSWORD) {
    rules = {
      currentPassword: [Rules.isRequired],
      newPassword: [Rules.isRequired],
      newPasswordConfirmation: [Rules.isRequired]
    };
    faildAction = onChangeAccounPasswordFaild;
  }

  const isInvalid = Vaidator(action.payload, rules);

  if (isInvalid) dispatch(faildAction(isInvalid));
  else next(action);
};


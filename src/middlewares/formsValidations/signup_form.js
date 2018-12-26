import { signUpInvalidFields } from 'actions/signup';
import { SIGN_UP } from 'constantsTypes';
import { Rules, Vaidator } from '../helpers/validators';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== SIGN_UP) return next(action);
  const rules = {
    subDomain: [Rules.subdomain],
    code: [Rules.isPromoCode]
  };
  const isInvalid = Vaidator(action.payload, rules);

  if (isInvalid) dispatch(signUpInvalidFields(isInvalid));
  else next(action);
};


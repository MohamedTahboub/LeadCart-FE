
import { CREATE_SUB_ACCOUNT } from 'constantsTypes';
import { onCreateSubAccountFailed } from 'actions/agency';
import { Rules, Vaidator } from '../helpers/validators';


export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== CREATE_SUB_ACCOUNT) return next(action);

  const rules = {
    firstName: [Rules.isRequired],
    lastName: [Rules.isRequired],
    email: [Rules.email]
  };

  const isInvalid = Vaidator(action.payload, rules);

  if (isInvalid) dispatch(onCreateSubAccountFailed(isInvalid));
  else next(action);
};


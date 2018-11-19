
import { CREATE_NEW_MEMBER } from 'constantsTypes';
import { onCreateNewMemberFaild } from 'actions/teamMembers';
import { Rules, Vaidator } from '../helpers/validators';


export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== CREATE_NEW_MEMBER) return next(action);

  const rules = {
    firstName: [Rules.isRequired],
    lastName: [Rules.isRequired],
    email: [Rules.email]
  };

  const isInvalid = Vaidator(action.payload, rules);

  if (isInvalid) dispatch(onCreateNewMemberFaild(isInvalid));
  else next(action);
};


import { CREATE_NEW_MEMBER, ACTIVATE_MEMBER } from 'constantsTypes';
import {
  onCreateNewMemberSuccess,
  onCreateNewMemberFailed,
  activateMemberSuccess,
  activateMemberFailed
} from 'actions/teamMembers';
import { apiRequest } from 'actions/apiRequest';


export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== CREATE_NEW_MEMBER && action.type !== ACTIVATE_MEMBER) return next(action);

  if (action.type === CREATE_NEW_MEMBER) {
    return dispatch(apiRequest({
      options: {
        method: 'POST',
        body: action.payload,
        uri: '/api/users/member/',
        contentType: 'json'
      },
      onSuccess: onCreateNewMemberSuccess.bind(this, action.payload),
      onFailed: onCreateNewMemberFailed
    }));
  }

  if (action.type === ACTIVATE_MEMBER) {
    const memberStatus = { memberId: action.payload, active: true };
    return dispatch(apiRequest({
      options: {
        method: 'put',
        body: memberStatus,
        uri: '/api/users/member/active',
        contentType: 'json'
      },
      onSuccess: activateMemberSuccess.bind(this, action.payload),
      onFailed: activateMemberFailed
    }));
  }
};

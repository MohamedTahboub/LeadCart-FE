import {
  CREATE_NEW_MEMBER,
  ACTIVATE_MEMBER,
  DELETE_MEMBER
} from 'constantsTypes';
import {
  onCreateNewMemberSuccess,
  onCreateNewMemberFailed,
  activateMemberSuccess,
  activateMemberFailed,
  deleteMemberSuccess,
  deleteMemberFailed

} from 'actions/teamMembers';
import { apiRequest } from 'actions/apiRequest';


export default ({ dispatch }) => (next) => (action) => {
  if (
    action.type !== CREATE_NEW_MEMBER
    && action.type !== ACTIVATE_MEMBER
    && action.type !== DELETE_MEMBER
  ) return next(action);

  if (action.type === CREATE_NEW_MEMBER) {
    const { payload, meta = {} } = action;
    return dispatch(apiRequest({
      options: {
        method: 'POST',
        body: action.payload,
        uri: '/api/users/member/',
        contentType: 'json'
      },
      onSuccess: (args) => {
        if (meta.onSuccess) meta.onSuccess(args);
        return onCreateNewMemberSuccess({ ...payload, _id: args.id });
      },
      onFailed: (message) => {
        if (meta.onFailed) meta.onFailed(message);
        return onCreateNewMemberFailed(message);
      }
    }));
  }

  if (action.type === ACTIVATE_MEMBER) {
    return dispatch(apiRequest({
      options: {
        method: 'put',
        body:  action.payload,
        uri: '/api/users/member/active',
        contentType: 'json'
      },
      onSuccess: activateMemberSuccess.bind(this, action.payload),
      onFailed: activateMemberFailed
    }));
  }

  if (action.type === DELETE_MEMBER) {
    const { payload, meta = {} } = action;

    return dispatch(apiRequest({
      options: {
        method: 'DELETE',
        body: payload,
        uri: '/api/users/member',
        contentType: 'json'
      },
      onSuccess: (args) => {
        if (meta.onSuccess) meta.onSuccess(args);
        return deleteMemberSuccess(payload);
      },
      onFailed:  (message) => {
        if (meta.onFailed) meta.onFailed(message);
        return deleteMemberFailed(message);
      }
    }));
  }
};

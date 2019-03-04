import {
  GET_MEMBERS_SUCCESS,
  CREATE_NEW_MEMBER,
  CREATE_NEW_MEMBER_SUCCESS,
  CREATE_NEW_MEMBER_FAILED,
  ACTIVATE_MEMBER,
  ACTIVATE_MEMBER_SUCCESS,
  ACTIVATE_MEMBER_FAILED,
} from 'constantsTypes';


export const getMembersSuccess = (account) => ({
  type: GET_MEMBERS_SUCCESS,
  payload: account
});
export const onCreateNewMember = (account) => ({
  type: CREATE_NEW_MEMBER,
  payload: account
});

export const onCreateNewMemberSuccess = (message) => ({
  type: CREATE_NEW_MEMBER_SUCCESS,
  payload: message
});
export const onCreateNewMemberFailed = (message) => ({
  type: CREATE_NEW_MEMBER_FAILED,
  payload: message
});


export const activateMember = (memberState) => ({
  type: ACTIVATE_MEMBER,
  payload: memberState
});

export const activateMemberSuccess = (id) => ({
  type: ACTIVATE_MEMBER_SUCCESS,
  payload: id
});

export const activateMemberFailed = (message) => ({
  type: ACTIVATE_MEMBER_FAILED,
  payload: message
});

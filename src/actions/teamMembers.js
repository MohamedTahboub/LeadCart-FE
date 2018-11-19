import {
  GET_MEMBERS_SUCCESS,
  CREATE_NEW_MEMBER,
  CREATE_NEW_MEMBER_SUCCESS,
  CREATE_NEW_MEMBER_FAILD,
  ACTIVATE_MEMBER,
  ACTIVATE_MEMBER_SUCCESS,
  ACTIVATE_MEMBER_FAILD,
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
export const onCreateNewMemberFaild = (message) => ({
  type: CREATE_NEW_MEMBER_FAILD,
  payload: message
});


export const activateMember = (id) => ({
  type: ACTIVATE_MEMBER,
  payload: id
});

export const activateMemberSuccess = (id) => ({
  type: ACTIVATE_MEMBER_SUCCESS,
  payload: id
});

export const activateMemberFaild = (message) => ({
  type: ACTIVATE_MEMBER_FAILD,
  payload: message
});

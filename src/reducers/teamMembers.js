import {
  CREATE_NEW_MEMBER_SUCCESS,
  CREATE_NEW_MEMBER_FAILD,
  ACTIVATE_MEMBER_SUCCESS,
  GET_MEMBERS_SUCCESS,
  ACTIVATE_MEMBER_FAILD
} from 'constantsTypes';

const initialState = {
  members: [],
  errors: {}
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case CREATE_NEW_MEMBER_SUCCESS: return { members: [...state.members, payload] };
  case GET_MEMBERS_SUCCESS: return { members: payload };
  case CREATE_NEW_MEMBER_FAILD:
    return {
      ...state,
      errors: typeof payload === 'object' ? payload : { message: payload }
    };
  case ACTIVATE_MEMBER_SUCCESS:
    return {
      ...state,
      members: state.members.map((member) => {
        if (member._id === payload) member.active = !member.active;

        return member;
      })
    };
  case ACTIVATE_MEMBER_FAILD: return { ...state, errors: { message: payload } };
  default: return state;
  }
};

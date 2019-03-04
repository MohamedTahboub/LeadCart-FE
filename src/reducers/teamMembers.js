import {
  CREATE_NEW_MEMBER_SUCCESS,
  CREATE_NEW_MEMBER_FAILED,
  ACTIVATE_MEMBER_SUCCESS,
  GET_MEMBERS_SUCCESS,
  ACTIVATE_MEMBER_FAILED
} from 'constantsTypes';

const initialState = {
  members: [],
  errors: {}
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case CREATE_NEW_MEMBER_SUCCESS: return { members: [...state.members, payload] };
  case GET_MEMBERS_SUCCESS: return { members: payload };
  case CREATE_NEW_MEMBER_FAILED:
    return {
      ...state,
      errors: typeof payload === 'object' ? payload : { message: payload }
    };
  case ACTIVATE_MEMBER_SUCCESS:
    return {
      ...state,
      members: state.members.map(({ active, member }) => {
        if (member._id === payload.id) active = payload.active;

        return { active, member };
      })
    };
  case ACTIVATE_MEMBER_FAILED: return { ...state, errors: { message: payload } };
  default: return state;
  }
};

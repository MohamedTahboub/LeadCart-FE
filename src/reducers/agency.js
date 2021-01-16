import {
  CHANGE_SUB_ACCOUNT_STATUS_SUCCESS,
  CREATE_SUB_ACCOUNT_FAILED,
  CREATE_SUB_ACCOUNT_SUCCESS,
  DELETE_SUB_ACCOUNT_SUCCESS,
  GET_SUB_ACCOUNTS,
  REQUEST_SUB_ACCOUNT_DELETION_SUCCESS
} from 'constantsTypes';

const initialState = {
  subAccounts: [],
  errors: {}
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case GET_SUB_ACCOUNTS: return {
    ...state,
    subAccounts: payload.map((agent) => ({ ...agent, active: agent.accountActive }))
  };
  case CREATE_SUB_ACCOUNT_SUCCESS: return { ...state, subAccounts: [...state.subAccounts, payload] };

  case CREATE_SUB_ACCOUNT_FAILED: return { ...state, errors: typeof payload === 'object' ? payload : { message: payload } };
  case DELETE_SUB_ACCOUNT_SUCCESS:
    return {
      ...state,
      subAccounts: state.subAccounts.filter(({ _id }) => _id !== payload.id)
    };
  case CHANGE_SUB_ACCOUNT_STATUS_SUCCESS:
    return {
      ...state,
      subAccounts: state.subAccounts.map((agent) => {
        if (agent._id === payload.agentId) return { ...agent, active: payload.active };
        return agent;
      })
    };
  case REQUEST_SUB_ACCOUNT_DELETION_SUCCESS:
    return {
      ...state,
      subAccounts: state.subAccounts.map((agent) => {
        if (agent._id === payload.id) {
          return {
            ...agent,
            active: payload.active,
            accountStatus: { date: new Date() }
          };
        }
        return agent;
      })
    };
  default: return state;
  }
};

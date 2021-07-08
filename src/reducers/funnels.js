import {
  CREATE_FUNNEL_RULE_SUCCESS,
  CREATE_FUNNEL_SUCCESS,
  DELETE_FUNNEL_RULE_SUCCESS,
  DELETE_FUNNEL_SUCCESS,
  GET_FUNNELS,
  REMOVE_OFFLINE_PAYMENT_METHOD_SUCCESS,
  UPDATE_FUNNEL_RULE_SUCCESS,
  UPDATE_FUNNEL_SUCCESS
} from '../constantsTypes';
import ids from 'shortid';

const initialState = [];


export default (state = initialState, { type, payload }) => {
  switch (type) {
  case GET_FUNNELS:
    return payload;
  case CREATE_FUNNEL_SUCCESS:
    return [...state, payload];
  case UPDATE_FUNNEL_SUCCESS: {
    return state.map((funnel) => {
      if (funnel._id === payload.funnel.funnelId) return { ...funnel, ...payload.funnel };

      return funnel;
    });
  }
  case DELETE_FUNNEL_SUCCESS: {
    return state.filter((funnel) => funnel._id !== payload.funnelId);
  }
  case CREATE_FUNNEL_RULE_SUCCESS: {
    return state.map((funnel) => {
      if (funnel._id === payload.funnelId) {
        const rules = Array.isArray(funnel.rules) ? [...funnel.rules, payload.rule] : [payload.rule];
        return {
          ...funnel,
          ...payload.originalFunnelDetails,
          rules
        };
      }

      return funnel;
    });
  }
  case UPDATE_FUNNEL_RULE_SUCCESS: {
    return state.map((funnel) => {
      if (funnel._id === payload.funnel) {
        const rules = funnel.rules.map((rule) => {
          if (rule._id === payload.ruleId) {
            return {
              ...payload.rule,
              triggerGroups: payload.rule.triggerGroups.map((group) => {
                return {
                  _id: ids.generate(),
                  ...group
                };
              }),
              _id: payload.ruleId
            };
          }

          return rule;
        });
        return {
          ...funnel,
          ...payload.originalFunnelDetails,
          rules
        };
      }

      return funnel;
    });
  }
  case DELETE_FUNNEL_RULE_SUCCESS: {
    return state.map((funnel) => {
      if (funnel._id === payload.funnel) {
        return {
          ...funnel,
          ...payload.originalFunnelDetails,
          rules: funnel.rules.filter((rule) => rule._id !== payload.ruleId)
        };
      } else {return funnel;}
    });
  }
  case REMOVE_OFFLINE_PAYMENT_METHOD_SUCCESS: {
    const { methodName } = payload || {};
    return state.map((funnel) => {
      if (Array.isArray(funnel.paymentMethods)) {
        const methods = funnel.paymentMethods.filter((method) => method !== methodName);
        return {
          ...funnel,
          paymentMethods: [...methods]
        };
      } else {
        return funnel;
      }
    });
  }
  default: return state;
  }
};

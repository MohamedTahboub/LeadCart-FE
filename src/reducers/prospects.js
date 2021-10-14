import { GET_BRAND_PROSPECTS_SUCCESS } from '../constantsTypes';


const initialState = [];

export const filterProspects = (prospects) => {
  if (!(Array.isArray(prospects) && prospects.length > 1)) return [];


  return Object.values(prospects.reduce((list, prospect) => {
    const { email } = prospect;
    if (list[email]) {
      list[email].history.push(prospect);
    } else {
      list[email] = { ...prospect };
      if (!list[email].history) list[email].history = [prospect];
    }
    return list;
  }, {}));

};

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case GET_BRAND_PROSPECTS_SUCCESS:


    return filterProspects(payload) || [];
  default: return state;
  }
};


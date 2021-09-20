import { APP_LAUNCH_SUCCESS, ARCHIVE_LEADS_SUCCESS, UNARCHIVE_LEADS_SUCCESS } from '../constantsTypes';


const initialState = [];


export default (state = initialState, { type, payload }) => {
  switch (type) {
  case APP_LAUNCH_SUCCESS:
    return payload.leads || [];
  case ARCHIVE_LEADS_SUCCESS: {
    if (payload.all)
      return state.map((lead) => ({ ...lead, archived: true }));

    if (Array.isArray(payload.ids)) {
      return state.map((lead) => ({
        ...lead,
        archived: payload?.ids?.includes(lead._id) ? true : lead.archived
      }));
    }

    return state;

  }
  case UNARCHIVE_LEADS_SUCCESS: {
    if (payload.all)
      return state.map((lead) => ({ ...lead, archived: false }));

    if (Array.isArray(payload.ids)) {
      return state.map((lead) => ({
        ...lead,
        archived: payload?.ids?.includes(lead._id) ? false : lead.archived
      }));
    }

    return state;

  }
  default: return state;
  }
};


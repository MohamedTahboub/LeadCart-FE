import {
  ARCHIVE_LEADS,
  ARCHIVE_LEADS_FAILED,
  ARCHIVE_LEADS_SUCCESS,
  UNARCHIVE_LEADS,
  UNARCHIVE_LEADS_FAILED,
  UNARCHIVE_LEADS_SUCCESS
} from 'constantsTypes';


export const archiveLeads = (leads, meta) => ({
  type: ARCHIVE_LEADS,
  payload: leads,
  meta
});
export const archiveLeadsSuccess = (leads) => ({
  type: ARCHIVE_LEADS_SUCCESS,
  payload: leads
});
export const archiveLeadsFailed = (errors) => ({
  type: ARCHIVE_LEADS_FAILED,
  payload: errors
});

export const unarchiveLeads = (leads, meta) => ({
  type: UNARCHIVE_LEADS,
  payload: leads,
  meta
});
export const unarchiveLeadsSuccess = (leads) => ({
  type: UNARCHIVE_LEADS_SUCCESS,
  payload: leads
});
export const unarchiveLeadsFailed = (errors) => ({
  type: UNARCHIVE_LEADS_FAILED,
  payload: errors
});


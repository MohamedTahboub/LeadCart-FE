import {
  GENERATE_ORDER_INVOICE,
  GENERATE_ORDER_INVOICE_FAILED,
  GENERATE_ORDER_INVOICE_SUCCESS,
  GENERATE_SAMPLE_INVOICE,
  GENERATE_SAMPLE_INVOICE_FAILED,
  GENERATE_SAMPLE_INVOICE_SUCCESS,
  GET_INVOICING_DETAILS,
  UPDATE_INVOICING_DETAILS,
  UPDATE_INVOICING_DETAILS_FAILED,
  UPDATE_INVOICING_DETAILS_SUCCESS
} from 'constantsTypes';


export const getInvoicingDetails = (settings) => ({
  type: GET_INVOICING_DETAILS,
  payload: settings
});

export const updateInvoicingDetails = (settings, meta) => ({
  type: UPDATE_INVOICING_DETAILS,
  payload: settings,
  meta
});
export const updateInvoicingDetailsSuccess = (settings) => ({
  type: UPDATE_INVOICING_DETAILS_SUCCESS,
  payload: settings
});
export const updateInvoicingDetailsFailed = (message) => ({
  type: UPDATE_INVOICING_DETAILS_FAILED,
  payload: message
});


export const generateSampleInvoice = (settings, meta) => ({
  type: GENERATE_SAMPLE_INVOICE,
  payload: settings,
  meta
});
export const generateSampleInvoiceSuccess = (settings) => ({
  type: GENERATE_SAMPLE_INVOICE_SUCCESS,
  payload: settings
});
export const generateSampleInvoiceFailed = (message) => ({
  type: GENERATE_SAMPLE_INVOICE_FAILED,
  payload: message
});


export const generateOrderInvoice = (order, meta) => ({
  type: GENERATE_ORDER_INVOICE,
  payload: order,
  meta
});
export const generateOrderInvoiceSuccess = (settings) => ({
  type: GENERATE_ORDER_INVOICE_SUCCESS,
  payload: settings
});
export const generateOrderInvoiceFailed = (message) => ({
  type: GENERATE_ORDER_INVOICE_FAILED,
  payload: message
});

import * as notification from './notifications';

export { navigateTo, openNewWindow } from './navigations';
export { showIntercomIcon } from './intercom';
export { getCurrencySymbol, getPriceFormat, getPriceWithCurrency } from './currencies';
export { default as stopTabClosing } from './stopTabClosing';
export { default as property } from './propertiesReader';
export { default as htmlToImage } from './htmlToImage';
export { default as slugify } from './slugify';
export * from './references';

export {
  bytesToSize,
  getTextContentFromTextNode,
  friendlyMessage,
  capitalize,
  exportOrdersToCsv,
  formatLanguage
} from './conversions';
export {
  filteringActivities,
  filterCustomers,
  RoundTow,
  injectDefaultLabels,
  trimExtraText,
  includesIgnoreCase,
  mapListToObject,
  throttle,
  isObjectsEquivalent,
  nestedKeyValue,
  getBrandActivePackage,
  getGavatarByEmail,
  tokenizedContent,
  formatPricingValue,
  getCountryByCode,
  nodeHasChildElement,
  downloadFile
} from './specialFuncs';
export { notification };

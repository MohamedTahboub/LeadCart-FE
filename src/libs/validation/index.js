import './yupMethods';

export { default as UpsellSchema } from './upsellSchema';
export { default as ProductSchema } from './productSchema';
export { default as FulfillmentsValidationSchema } from './fulfillmentSchema';
export { default as emailFooterSchema } from './emailFooter';
export { default as generalSettingSchema } from './marketPlaceSettingSchema';
export { default as marketPlaceSettingSchema, contactLinksSchema, invoicingSettingsSchema } from './settings';
export { default as couponSchema } from './couponSchema';
export { default as upgradeUserSchema } from './userUpgrade';
export { freeTrailSignup, proSignup } from './proSignup';
export { default as dashboardChartsSettings } from './dashboardChartsSettings';
export { default as funnelSchema } from './funnelSchema';
export { default as funnelRuleSchema } from './funnelRule';
export { default as languagesSchema } from './languagesSchema';
export { default as funnelDuplicateSchema } from './funnelDuplicate';
export { default as productsFontsSchema } from './productsFonts';
export {
  createProductsTemplate as createProductsTemplateSchema,
  updateProductsTemplate as updateProductsTemplateSchema
} from './createProductTemplate';


import sampleProductData from 'data/newProductSampleData';
import * as types from '../actionsTypes';


const initialState = {
  modals: { sectionSetting: false },
  product: sampleProductData,
  standAlone: true,
  productPricing: {
    openModal: false,
    toEdit: {}
  }
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case types.UPDATE_STATE:
    return {
      ...state,
      ...payload
    };
  case types.PRODUCT_FIELD_CHANGE:
    return {
      ...state,
      product: payload
    };
  case types.SECTION_SETTING:
    return state;
  case types.TOGGLE_SECTION_SETTINGS_SIDEBAR:
    return {
      ...state,
      modals: {
        ...state.modals,
        sectionSetting: payload
      }
    };

  case types.ADD_NEW_SECTION:
    return {
      ...state,
      product: {
        ...state.product,
        sections: !state.product.sections ? [payload] : [
          payload,
          ...state.product.sections
        ]
      }
    };

  case types.UPDATE_DISPLAY_MODE:
    return {
      ...state,
      displayMode: payload
    };

  case types.UPDATE_SECTION_SETTINGS:
    return {
      ...state,
      modals: {
        ...state.modals,
        sectionSetting: payload
      },
      product: {
        ...state.product,
        sections: state.product.sections.map((sec) => {
          if (sec.id === (payload && payload.id)) return payload;
          return sec;
        })
      }
    };
  case types.UPDATE_PRODUCT_SECTION:

    return {
      ...state,
      product: {
        ...state.product,
        sections: state.product.sections.map((sec) => {
          if (sec.id === payload.id) {
            const newSection = { ...payload };
            return newSection;
          }
          return sec;
        })
      }
    };
  case types.DELETE_PRODUCT_SECTION:
    return {
      ...state,
      product: {
        ...state.product,
        sections: state.product.sections.filter((sec) => sec.id !== payload)
      }
    };

  case types.TOGGLE_PRODUCT_PRICING_MODAL:
    return {
      ...state,
      productPricing: {
        ...state.productPricing,
        openModal: !state.productPricing?.openModal,
        toEdit: {}
      }
    };
  case types.EDIT_PRODUCT_PRICING_OPTION:
    return {
      ...state,
      productPricing: {
        ...state.productPricing,
        openModal: true,
        toEdit: payload
      }
    };
  case types.ADD_PRODUCT_PRICING_OPTION:
    return {
      ...state,
      product: {
        ...state.product,
        pricingOptions: [...(state.product.pricingOptions || []), payload]
      }
    };
  case types.SELECT_PRODUCT_PRICING_OPTION:
    return {
      ...state,
      product: {
        ...state.product,
        pricingOptions: state.product.pricingOptions.map((pricingOption) => {
          let active = false;
          if (pricingOption.id === payload)
            active = true;

          return { ...pricingOption, active };
        })
      }
    };
  case types.DELETE_PRODUCT_PRICING_OPTION:
    return {
      ...state,
      product: {
        ...state.product,
        pricingOptions: state.product.pricingOptions
          .filter((pricingOption) => pricingOption.id !== payload)
      }
    };
  case types.TOGGLE_PRODUCT_BACKGROUND_MODAL:
    return {
      ...state,
      productBackground: !state.productBackground
    };

  default: return state;
  }
};

import sampleProductData from 'data/newProductSampleData';
import * as types from '../actionsTypes';
import * as immutable from 'object-path-immutable';


const initialState = {
  modals: { sectionSetting: false },
  product: sampleProductData,
  savingStatus: {},
  changeHistory: [],
  standAlone: true,
  currentActiveHistoryIndex: 0,
  productPricing: {
    openModal: false,
    toEdit: {}
  }
};
const getHistoryTrackingProps = (state = {}) => {
  const { currentActiveHistoryIndex = 0, changeHistory } = state;


  // remove the future stored indices, and update the index +1
  const newCurrentActiveHistoryIndex = currentActiveHistoryIndex + 1;
  const newChangeHistory = [
    ...(changeHistory || []),
    { ...state.product }
  ]
    .filter((item, index) => index <= newCurrentActiveHistoryIndex);

  console.log({
    currentActiveHistoryIndex: newCurrentActiveHistoryIndex,
    changeHistory: newChangeHistory,
    canUndo: currentActiveHistoryIndex > 0,
    canRedo: currentActiveHistoryIndex < (newChangeHistory.length - 1)
  });

  return {
    currentActiveHistoryIndex: newCurrentActiveHistoryIndex,
    changeHistory: newChangeHistory,
    canUndo: currentActiveHistoryIndex > 0,
    canRedo: currentActiveHistoryIndex < (newChangeHistory.length - 1)
  };
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case types.UPDATE_STATE:
    return {
      ...state,
      ...payload
    };
  case types.PRODUCT_FIELD_CHANGE: {
    const historyProps = getHistoryTrackingProps(state);
    return {
      ...state,
      ...historyProps,
      product: payload
    };
  }
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

  case types.ADD_NEW_SECTION: {
    const historyProps = getHistoryTrackingProps(state);
    return {
      ...state,
      ...historyProps,
      product: {
        ...state.product,
        sections: !state.product.sections ? [payload] : [
          payload,
          ...state.product.sections
        ]
      }
    };
  }
  case types.UPDATE_DISPLAY_MODE:
    return {
      ...state,
      displayMode: payload
    };

  case types.UPDATE_SECTION_SETTINGS: {
    const historyProps = getHistoryTrackingProps(state);
    return {
      ...state,
      ...historyProps,
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
  } case types.UPDATE_PRODUCT_SECTION: {
    const historyProps = getHistoryTrackingProps(state);
    return {
      ...state,
      ...historyProps,
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
  } case types.DELETE_PRODUCT_SECTION: {
    const historyProps = getHistoryTrackingProps(state);
    return {
      ...state,
      ...historyProps,
      product: {
        ...state.product,
        sections: state.product.sections.filter((sec) => sec.id !== payload)
      }
    };
  }

  case types.TOGGLE_PRODUCT_PRICING_MODAL:
    return {
      ...state,
      productPricing: {
        ...state.productPricing,
        openModal: !state.productPricing?.openModal,
        isEditMode: false,
        toEdit: {}
      }
    };
  case types.EDIT_PRODUCT_PRICING_OPTION:
    return {
      ...state,
      productPricing: {
        ...state.productPricing,
        openModal: true,
        isEditMode: true,
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
  case types.UPDATE_PRODUCT_PRICING_OPTION: {

    const historyProps = getHistoryTrackingProps(state);
    return {
      ...state,
      ...historyProps,
      product: {
        ...state.product,
        pricingOptions: state.product.pricingOptions.map((option) => {
          if (option.id === payload.id) {
            const newPricingOption = { ...option, ...payload };
            return newPricingOption;
          } else {return option;}
        })
      }
    };
  }
  case types.SELECT_PRODUCT_PRICING_OPTION: {
    const historyProps = getHistoryTrackingProps(state);
    return {
      ...state,
      ...historyProps,
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
  }
  case types.DELETE_PRODUCT_PRICING_OPTION: {

    const historyProps = getHistoryTrackingProps(state);
    return {
      ...state,
      ...historyProps,
      product: {
        ...state.product,
        pricingOptions: state.product.pricingOptions
          .filter((pricingOption) => pricingOption.id !== payload)
      }
    };
  }
  case types.TOGGLE_PRODUCT_BACKGROUND_MODAL:
    return {
      ...state,
      productBackground: !state.productBackground
    };
  case types.TOGGLE_PRODUCT_FONTS_MODAL:
    return {
      ...state,
      productFontsModal: !state.productFontsModal
    };
  case types.UPDATE_PRODUCT_SAVING_STATUS:
    return {
      ...state,
      savingStatus: { ...state.savingStatus, ...payload }
    };

  case types.UPDATE_SHIPPING_METHOD_DETAILS: {
    const historyProps = getHistoryTrackingProps(state);
    const shippingMethods = state.product.shippingMethods.map((method) => {
      if (method.id === payload.id)
        return { ...method, ...payload };
      return method;
    });

    return {
      ...state,
      ...historyProps,
      product: {
        ...state.product,
        shippingMethods
      }
    };
  }
  case types.ADD_NEW_SHIPPING_METHOD: {
    const historyProps = getHistoryTrackingProps(state);
    return {
      ...state,
      ...historyProps,
      product: {
        ...state.product,
        shippingMethods: Array.isArray(state.product.shippingMethods) ?
          [...state.product.shippingMethods, payload]
          :
          [payload]
      }
    };
  }
  case types.REDO_PRODUCT_CHANGE: {
    const targetIndex = (state.currentActiveHistoryIndex || 0) + 1;
    console.log({
      current: state.currentActiveHistoryIndex,
      next: targetIndex
    });
    const previousVersion = state.changeHistory[targetIndex];
    if (!previousVersion) {
      return {
        canUndo: targetIndex > 0,
        canRedo: targetIndex < (state.changeHistory.length - 1),
        currentActiveHistoryIndex: targetIndex,
        ...state
      };
    }

    return immutable.set({
      ...state,
      canUndo: true,
      currentActiveHistoryIndex: targetIndex
    }, 'product', previousVersion);
  }
  case types.UNDO_PRODUCT_CHANGE: {
    const targetIndex = (state.currentActiveHistoryIndex || 0) - 1;
    console.log({
      current: state.currentActiveHistoryIndex,
      next: targetIndex
    });
    const nextProductVersion = state.changeHistory[targetIndex];
    if (!nextProductVersion) {
      return {
        canUndo: false,
        ...state
      };
    }

    return immutable.set({
      ...state,
      canUndo: targetIndex > 0,
      canRedo: targetIndex < (state.changeHistory.length - 1),
      currentActiveHistoryIndex: targetIndex
    }, 'product', nextProductVersion);
  }
  default: return state;
  }
};

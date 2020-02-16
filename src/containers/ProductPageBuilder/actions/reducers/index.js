import sampleProductData from 'data/newProductSampleData';
import * as types from '../actionsTypes';


const initialState = {
  modals: {
    sectionSetting: false
  },
  product: sampleProductData
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
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
        sections: [...state.product.sections, payload]
      }
    };
  default: return state;
  }
};

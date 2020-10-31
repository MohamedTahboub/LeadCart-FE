import React, { useEffect, useReducer, useState } from 'react';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import ReactToolTip from 'react-tooltip';
import { connect } from 'react-redux';
import common from 'components/common';
import { LoadingPage } from 'components/Loaders';
import sampleProductData from 'data/product';
import { htmlToImage as generateImageFromHtmlElement, mapListToObject, notification } from 'libs';
import { ProductSchema } from 'libs/validation';
import * as productGeneralActions from 'actions/product';
import * as filesActions from 'actions/files';

import {
  ProductContext,
  connectActions,
  productActions,
  reducers
} from './actions';


import {
  Header,
  NewPricingOptionModal,
  PageBackgroundModal,
  ScreenBackgroundSetup,
  SettingSideBar,
  SideBar,
  Workspace
} from './components';

const {
  Page,
  FlexBox
} = common;

const checkoutSectionDetails = {
  id: 'checkoutSection',
  hidden: false,
  type: 'checkoutSection',
  content: { value: '' }
};
const matchProductSectionsIds = (product) => {
  const sections = Array.isArray(product.sections) ?
    product.sections.map(({ id, _id = id, ...section }) => ({ ...section, id: _id }))
    : [];

  return {
    ...product,
    sections
  };
};
const hasCheckoutSection = ({ sections = [] } = {}) =>
  sections.find(({ type }) => type === 'checkoutSection');

const injectProductSection = (product = {}) => ({
  ...product,
  sections: [...product.sections, checkoutSectionDetails]
});
const ProductBuilder = ({
  funnelsMap,
  productsMap,
  // uploadFile,
  defaultBrandCurrency,
  match,
  history,
  ...props
}) => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [state, dispatch] = useReducer(reducers, { product: sampleProductData });
  const actions = connectActions(productActions, { state, dispatch });


  useEffect(() => {
    const { params: { productId, funnelUrl } = {} } = match;

    const product = productsMap[productId];
    const funnel = funnelsMap[funnelUrl];

    if (!funnelUrl && product) {
      if (state.product._id !== productId) {
        const updatedProductSection = hasCheckoutSection(product) ? product : injectProductSection(product);
        actions.updateState({
          standAlone: true,
          product: matchProductSectionsIds(updatedProductSection)
        });
        return setLoading(false);
      }
    }


    if (funnel && product) {
      const localProductId = state.product._id;
      if (localProductId !== productId) {

        const updatedProductSection = hasCheckoutSection(product) ? product : injectProductSection(product);
        actions.updateState({
          standAlone: false,
          product: matchProductSectionsIds(updatedProductSection),
          funnel: funnel
        });
      }
      return setLoading(false);
    }
    //eslint-disable-next-line
  }, [funnelsMap, productsMap]);

  const onSaveProduct = async () => {

    const { product: productData } = state;
    setSaving(true);
    const {
      isValid,
      value: product
    } = await ProductSchema(productData);

    if (!isValid)
      return notification.failed('Can\'t save, validation Error');

    props.updateProduct(
      {
        productId: productData._id,
        details: product
      },
      {
        onSuccess: () => {
          setSaving(false);
          notification.success('Changes Saved');
        },
        onFailed: (message) => {
          setSaving(false);
          notification.failed(message);
        }
      }
    );
  };

  if (loading) return <LoadingPage message='Setting up ...' />;

  const { funnel: { currency = defaultBrandCurrency } = {}, product: { pageStyles = {} } = {} } = state;


  return (
    <ProductContext.Provider value={{ state, actions }}>
      <Page fullSize className='flex-container flex-column'>
        <Header history={history} onSave={onSaveProduct} saving={saving} />
        <FlexBox id='blocks' flex className='relative-element'>
          <ScreenBackgroundSetup backgrounds={pageStyles} />
          <DndProvider backend={Backend}>
            <SideBar canOffer={state.product?.category === 'checkout'} />
            <Workspace />
            <SettingSideBar />
          </DndProvider>
        </FlexBox>
        <NewPricingOptionModal
          isVisible
          onClose={actions.onTogglePricingOptionModal}
          currency={currency}
        />
        <PageBackgroundModal />
      </Page>
      <ReactToolTip delayShow={400} />
    </ProductContext.Provider>
  );
};

ProductBuilder.propTypes = {};

const propifyState = ({
  funnels = [],
  products: { products = [] } = {},
  settings: { generalModel: { currency: defaultBrandCurrency = 'USD' } = {} } = {}
}) => ({
  funnelsMap: mapListToObject(funnels, 'url'),
  productsMap: mapListToObject(products, '_id'),
  defaultBrandCurrency
});
export default connect(propifyState, { ...productGeneralActions, ...filesActions })(ProductBuilder);

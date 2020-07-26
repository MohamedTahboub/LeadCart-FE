import React, { useEffect, useReducer, useState } from 'react';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import ReactToolTip from 'react-tooltip';
import { connect } from 'react-redux';
import common from 'components/common';
import { ProductBuilderSkelton } from 'components/Loaders';
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
  SettingSideBar,
  SideBar,
  Workspace
} from './components';

const {
  Page,
  FlexBox
} = common;

const staticSectionDetails = {
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
const hasStaticSection = ({ sections = [] } = {}) =>
  sections.find(({ type }) => type === 'checkoutSection');

const injectProductSection = (product = {}) => ({
  ...product,
  sections: [...product.sections, staticSectionDetails]
});
const ProductBuilder = ({
  funnelsMap,
  productsMap,
  uploadFile,
  ...props
}) => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [state, dispatch] = useReducer(reducers, { product: sampleProductData });
  const actions = connectActions(productActions, { state, dispatch });


  useEffect(() => {
    const { params: { productId, funnelUrl } = {} } = props.match;

    const product = productsMap[productId];
    const funnel = funnelsMap[funnelUrl];

    if (!funnelUrl && product) {
      if (state.product._id !== productId) {
        if (product) {
          actions.updateState({
            standAlone: true,
            product: matchProductSectionsIds(product)
          });
          return setLoading(false);
        }
      }
    }


    if (funnel && product) {
      const localProductId = state.product._id;
      if (localProductId !== productId) {

        const updatedProductSection = hasStaticSection(product) ? product : injectProductSection(product);
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
      // errors,
      value: product
    } = await ProductSchema(productData);

    if (!isValid)
      return notification.failed('Can\'t save, validation Error');

    const saveTheProduct = (uploadedFileUrl) =>
      props.updateProduct(
        {
          productId: productData._id,
          details: {
            ...product,
            thumbnail: uploadedFileUrl
          }
        },
        {
          onSuccess: (msg) => {
            setSaving(false);
            notification.success('Changes Saved');
          },
          onFailed: (message) => {
            setSaving(false);
            notification.failed(message);
          }
        }
      );
    const thumbnail = await generateImageFromHtmlElement('product-builder-window', { fileName: productData._id });

    uploadFile({ file: thumbnail, type: 'products' }, {
      onSuccess: saveTheProduct,
      onFailed: saveTheProduct,
      options: { showNotification: false }
    });

  };
  if (loading) return <ProductBuilderSkelton />;
  return (
    <ProductContext.Provider value={{ state, actions }}>
      <Page fullSize className='flex-container flex-column'>
        <Header history={props.history} onSave={onSaveProduct} saving={saving} />
        <FlexBox id='blocks' flex className='relative-element'>
          <DndProvider backend={Backend}>
            <SideBar canOffer={state.product.category !== 'thankyoupage'} />
            <Workspace />
            <SettingSideBar />
          </DndProvider>
        </FlexBox>
      </Page>
      <ReactToolTip delayShow={400} />
    </ProductContext.Provider>
  );
};

ProductBuilder.propTypes = {};

const propifyState = ({ funnels = [], products: { products = [] } = {} }) => ({
  funnelsMap: mapListToObject(funnels, 'url'),
  productsMap: mapListToObject(products, '_id')
});
export default connect(propifyState, { ...productGeneralActions, ...filesActions })(ProductBuilder);

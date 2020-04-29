import React, { useReducer, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import sampleProductData from 'data/product';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import { connect } from 'react-redux';
import { mapListToObject } from 'libs';
import * as productGeneralActions from 'actions/product';
import { ProductBuilderSkelton } from 'components/Loaders';
import ReactToolTip from 'react-tooltip';
import { notification } from 'libs';
import { ProductSchema } from 'libs/validation';

import {
  reducers,
  connectActions,
  productActions,
  ProductContext
} from './actions';


import {
  Header,
  SideBar,
  Workspace,
  SettingSideBar
} from './components';

const {
  Page,
  FlexBox
} = common;

const ProductBuilder = ({
  funnelsMap,
  productsMap,
  ...props
}) => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [state, dispatch] = useReducer(reducers, { product: sampleProductData });
  const actions = connectActions(productActions, { state, dispatch });


  const toggleLoading = () => setLoading((loading) => !loading);

  useEffect(() => {
    const { params: { productId, funnelId } = {} } = props.match;

    if (!funnelId && productId) {
      const product = productsMap[productId];

      if (state.product._id !== productId) {
        if (product) {
          actions.updateState({
            standAlone: true,
            product,
            // funnel: isFunnelExist
          });
          return setLoading(false);
        }
      }
    }
    const isFunnelExist = funnelsMap[funnelId];
    if (isFunnelExist && productId === 'new') return setLoading(false);


    // return props.createNewProduct({
    // funnelId,
    // product: sampleSelectedProduct
    // });


    if (isFunnelExist) {
      const product = productsMap[productId];
      // const isProductFunnel = isFunnelExist.products.find((product) => product.productId === productId);

      if (product) {
        actions.updateState({
          standAlone: false,
          product,
          funnel: isFunnelExist
        });
      }
      return setLoading(false);
    }
  }, [funnelsMap, productsMap]);

  const onSaveProduct = async () => {
    const { product: productData } = state;
    setSaving(true);
    const {
      isValid,
      // errors,
      value: product
    } = await ProductSchema(productData);

    if (!isValid) {
      
      return notification.failed('Can\'t save, Validation Error');
    }

    props.updateProduct(
      {
        productId: productData._id,
        details: product
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
  };
  if (loading) return <ProductBuilderSkelton />;

  return (
    <ProductContext.Provider value={{ state, actions }}>
      <Page fullSize className='flex-container flex-column'>
        <Header history={props.history} onSave={onSaveProduct} saving={saving} />
        <FlexBox id='blocks' flex className='relative-element'>
          <DndProvider backend={Backend}>
            <SideBar />
            <Workspace />
            <SettingSideBar />
          </DndProvider>
        </FlexBox>
      </Page>
      <ReactToolTip delayShow={400} />
    </ProductContext.Provider>
  );
};

ProductBuilder.propTypes = {

};

const propifyState = ({ funnels = [], products: { products = [] } = {} }) => ({
  funnelsMap: mapListToObject(funnels, 'url'),
  productsMap: mapListToObject(products, '_id')
});
export default connect(propifyState, productGeneralActions)(ProductBuilder);

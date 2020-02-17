import React, { useReducer, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import sampleProductData from 'data/newProductSampleData';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import { connect } from 'react-redux';
import { mapListToObject } from 'libs';
import * as productGeneralActions from 'actions/product';
import { ProductBuilderSkelton } from 'components/Loaders';

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
  ComponentSettingSideBar
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

  const [state, dispatch] = useReducer(reducers, { product: sampleProductData });
  const actions = connectActions(productActions, { state, dispatch });


  const toggleLoading = () => setLoading((loading) => !loading);

  useEffect(() => {
    const { params: { productId, funnelId } = {} } = props.match;

    const isFunnelExist = funnelsMap[funnelId];
    if (isFunnelExist && productId === 'new') {
      console.log('creating new Funnel Product', funnelId);

      toggleLoading();
    }

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
      toggleLoading();
    }
  }, [funnelsMap, productsMap]);

  if (loading) return <ProductBuilderSkelton />;
  return (
    <ProductContext.Provider value={{ state, actions }}>
      <Page fullSize className='flex-container flex-column'>
        <Header history={props.history} />
        <FlexBox id='blocks' flex className='relative-element'>
          <DndProvider backend={Backend}>
            <SideBar />
            <Workspace />
            <ComponentSettingSideBar />
          </DndProvider>
        </FlexBox>
      </Page>
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

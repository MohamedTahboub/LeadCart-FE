import React, { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import sampleProductData from 'data/newProductSampleData';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import { connect } from 'react-redux';
import { mapListToObject } from 'libs';


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
  ...props,
}) => {
  const [state, dispatch] = useReducer(reducers, { product: sampleProductData });
  const actions = connectActions(productActions, { state, dispatch });


  useEffect(() => {
    const { params: { productId, funnelId } = {} } = props.match;

    const isFunnelExist = funnelsMap[funnelId];
    if (isFunnelExist && productId === 'new') {
      return createNewFunnelProduct({
        funnelId,
        product: sampleSelectedProduct
      });
    }

    if (isFunnelExist) {
      const product = productsMap[productId];
      const isProductFunnel = isFunnelExist.products.find((product) => product.productId === productId);

      if (product && isProductFunnel) {
        actions.updateState({
          product,
          funnel: isFunnelExist
        });
      }
    }
  }, []);

  return (
    <ProductContext.Provider value={{ state, actions }}>
      <Page fullSize className='flex-container flex-column'>
        <Header />
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
export default connect(propifyState)(ProductBuilder);

import React, { useCallback, useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import productSample from 'data/product.json';
import * as productActions from 'actions/product';
import { connect } from 'react-redux';
import common from 'components/common';
import { includesIgnoreCase, mapListToObject, notification } from 'libs';
import './style.css';
import { Product } from './components';


const getMatchedProducts = (products = [], nodes, activeNodeId, filterKey) => {
  const activeNode = nodes.find((node) => node.elementId === activeNodeId);

  if (!activeNode) return [];

  const { category } = activeNode || {};

  return products
    .filter((p) => includesIgnoreCase(p.category, category.toLowerCase()))
    .filter((p) => includesIgnoreCase(p.name, filterKey))
    .map((p) => (p._id === activeNode.productId ? { ...p, active: true } : p));
};

const getConnectedProducts = (funnels = []) => {
  const funnelsProducts = funnels.reduce((products, funnel) => {
    const { products: funnelProducts = [] } = funnel;
    const updated = [...funnelProducts.map((product) => ({ ...product, funnelId: funnel._id }))];
    return [...products, ...updated];
  }, []);

  const neededProperties = { funnelId: 'funnelId', productId: 'productId' };
  return mapListToObject(funnelsProducts, 'productId', neededProperties);
};


const {
  FlexBox,
  Tabs,
  Tab,
  InputRow,
  Button
} = common;
const { TextField } = InputRow;


const NodeSettingModal = ({
  show: isVisible,
  products,
  nodes,
  funnelId,
  onNodeSettingChange,
  connectedProductsMap,
  onClose,
  ...props
}) => {

  const [searchFilter, setFilter] = useState();
  const nodeProducts = useCallback(
    () =>
      getMatchedProducts(products, nodes, isVisible, searchFilter),
    [products, nodes, isVisible, searchFilter]
  )();

  const [loading, setLoading] = useState(false);

  const onSearch = ({ target: { value } }) => setFilter(value);

  const stopPropagation = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onSelect = (nodeId, productId) => () => {
    onNodeSettingChange(nodeId, productId);
  };


  const onNewProduct = (nodeId) => () => {
    const activeNode = nodes.find((node) => node.elementId === nodeId);

    const { category: productCategory } = activeNode;
    productSample.category = productCategory;
    const { history, funnelUrl } = props;

    setLoading(true);
    props.createNewProduct(
      productSample,
      {
        onSuccess: (product) => {
          const productId = product.id || product._id;
          onSelect(nodeId, productId);
          setTimeout(() => {
            setLoading(false);
            history.push(`${funnelUrl}/products/${productId}`);
            notification.success('Product Created ');
          }, 300);
        },
        onFailed: (message) => {
          setLoading(false);
          notification.failed(message);
        }
      }
    );
  };

  const isProductUsedOnOtherFunnel = (productId) => {
    const product = connectedProductsMap[productId];
    const inTheSameFunnel = product ? product.funnelId === funnelId : false;
    return !inTheSameFunnel;
  };

  return (
    <FlexBox
      column
      onClick={stopPropagation}
      className={`node-setting-modal ${isVisible ? 'open' : ''}`}
      role='presentation'
    >
      <FlexBox center='v-center' className='padding-v-10'>
        <FlexBox flex className='title margin-h-20'>
          Funnel Step Settings:
        </FlexBox>
        <IoMdClose onClick={onClose} className='gray-text animate margin-h-20 item-clickable' />
      </FlexBox>

      <Tabs active='targetProduct' className='padding-v-10 padding-h-10'>
        <Tab id='targetProduct' title='Target Product'>
          <TextField
            name='search'
            onChange={onSearch}
            placeholder='Search'
            className='full-width'
          />

          <FlexBox column flex center='h-center' className='margin-v-10 '>
            <Button
              onClick={onNewProduct(isVisible)}
              className='light-btn'
              disabled={loading}
              onprogress={loading}
            >
              New Product
            </Button>
            <div className='title-text text-align-center margin-v-5'>Or</div>
          </FlexBox>
          <FlexBox
            flex
            flexStart
            wrappable
            center='h-center'
            className='scrolling-60vh'
          >
            {
              nodeProducts.map((product) => (
                <Product
                  key={product._id}
                  isUsed={isProductUsedOnOtherFunnel(product._id)}
                  onSelect={onSelect(isVisible, product._id)}
                  active={product.active}
                  product={{
                    image: product.thumbnail,
                    name: product.name
                  }}
                  {...product}
                />
              ))
            }
          </FlexBox>
        </Tab>
      </Tabs>
    </FlexBox>
  );
};

NodeSettingModal.propTypes = {};

NodeSettingModal.defaultProps = {
  show: false,
  products: [],
  node: []
};


const mapStateToProps = ({
  funnels,
  products: { products = [] } = {}
}) => ({
  products,
  connectedProductsMap: getConnectedProducts(funnels)
});

export default connect(mapStateToProps, productActions)(NodeSettingModal);

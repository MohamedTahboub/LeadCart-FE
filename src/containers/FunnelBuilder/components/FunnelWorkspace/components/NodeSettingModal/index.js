import React, { useState, useEffect } from 'react';
import { IoMdClose } from 'react-icons/io';
import productSample from 'data/product.json';
import * as productActions from 'actions/product';
import { connect } from 'react-redux';
import common from 'components/common';
import { includesIgnoreCase, notification } from 'libs';
import './style.css';

const {
  FlexBox,
  FunnelTemplateNode,
  Tabs,
  Tab,
  InputRow,
  Button
} = common;
const { TextField } = InputRow;


const getMatchedProducts = (products, nodes, activeNodeId) => {
  const activeNode = nodes.find((node) => node.elementId === activeNodeId);

  if (!activeNode) return [];

  const { category } = activeNode || {};

  return products
    .filter((p) => includesIgnoreCase(p.category, category.toLowerCase()))
    .map((p) => (p._id === activeNode.productId ? { ...p, active: true } : p));
};

const NodeSettingModal = ({
  show: isVisible,
  products,
  nodes,
  onNodeSettingChange,
  onClose,
  ...props
}) => {
  const nodeProducts = getMatchedProducts(products, nodes, isVisible);

  const [filtered, setFilteredProducts] = useState(nodeProducts);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFilteredProducts(getMatchedProducts(products, nodes, isVisible));
  }, [products, isVisible, nodes]);

  const onSearch = ({ target: { value } }) => {
    if (!value) return setFilteredProducts(nodeProducts);

    const matched = nodeProducts.filter((product) => includesIgnoreCase(product.name, value));
    setFilteredProducts(matched);
  };
  const stopPropagation = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onSelect = (nodeId, productId) => () => {
    onNodeSettingChange(nodeId, productId);
  };

  const onProductEdit = (productId = 'new') => () => {
    const { history, funnelUrl } = props;
    history.push(`${funnelUrl}/products/${productId}`);
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
          setLoading(false);
          history.push(`${funnelUrl}/products/${product.id}`);
          notification.success('Product Created ');
        },
        onFailed: (message) => {
          setLoading(false);
          notification.failed(message);
        }
      }
    );
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
              // className='side-bar-nodes'
              onClick={onNewProduct(isVisible)}
              className='light-btn'
              disabled={loading}
              onprogress={loading}
            >
              New Product
            </Button>
            <div className='title-text text-align-center margin-v-5'>Or</div>
          </FlexBox>
          <FlexBox flex flexStart wrappable>
            {
              filtered.map((product) => (
                <FunnelTemplateNode
                  className='side-bar-nodes'
                  key={product._id}
                  onClick={onSelect(isVisible, product._id)}
                  active={product.active}
                  onEditExplore={onProductEdit(product._id)}
                  product={{
                    image: product.thumbnail || product.pagePreferences.image,
                    name: product.name
                  }
                  }
                  {...product}
                />
              ))
            }
          </FlexBox>
        </Tab>
        <Tab id='filter' title='Filters'>
          Filters
        </Tab>
      </Tabs>

    </FlexBox>
  );
};

NodeSettingModal.propTypes = {

};

NodeSettingModal.defaultProps = {
  show: false,
  products: [],
  node: []
};


const mapStateToProps = ({ products: { products = [] } = {} }) => ({ products });

export default connect(mapStateToProps, productActions)(NodeSettingModal);

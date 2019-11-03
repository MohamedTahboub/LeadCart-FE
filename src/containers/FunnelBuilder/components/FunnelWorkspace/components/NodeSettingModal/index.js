import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { SlidingAnimation } from 'components/common/Animation';
import { showIntercomIcon } from 'libs';
import { connect } from 'react-redux';
import common from 'components/common';


import './style.css';

const { FunnelTemplateNode } = common;

const NodeSettingModal = ({
  show: isVisible,
  products,
  nodes,
  onNodeSettingChange,
  onClose,
  ...props
}) => {
  const node = nodes.find((node) => node.elementId === isVisible);

  if(!node) return null
  // const [node, setNode] = useState(initialNode);
  const [matchProducts, setMatchedProducts] = useState([]);

  useEffect(() => {
    // const node = nodes.find((node) => node.id === isVisible);
    // setNode(node);
    const { category } = node || {};

    showIntercomIcon(!isVisible);

    const matched = products.filter((p) => (p.category && (p.category.toLowerCase() === category.toLowerCase())));
    // console.log(products, matched);
    setMatchedProducts(matched);
  }, [isVisible, products]);


  const stopPropagation = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onSelect = (productId) => {
    // setNode({ ...node, product });
    onNodeSettingChange(node.elementId, { name: 'productId', value: productId });
  };

  return (
    <SlidingAnimation
      onClick={stopPropagation}
      open={isVisible}
      type='horizontal'
      units={300}
      delay={0}
      className='node-setting-modal'
    // bodyClassName='node-setting-container'
    >
      <div className='node-setting-header'>
        <span onClick={onClose} className='close-btn' role='presentation'>
          <i className='fas fa-times-circle' />
        </span>
        <span className='title'>
          Category Node Setting:
        </span>
      </div>
      <div className='node-products-list-container'>
        {
          matchProducts.map((product) => (
            <FunnelTemplateNode
              key={node.category}
              onClick={() => onSelect(product._id)}
              active={product._id === node.productId}
              product={{
                image: product.pagePreferences && product.pagePreferences.image
              }
              }
              {...product}
            />
          ))
        }
      </div>
    </SlidingAnimation>
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

export default connect(mapStateToProps)(NodeSettingModal);

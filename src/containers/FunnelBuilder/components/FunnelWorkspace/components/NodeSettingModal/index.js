import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import { SlidingAnimation } from 'components/common/Animation';
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
  const [matchProducts, setMatchedProducts] = useState([]);

  useEffect(() => {
    const node = nodes.find((node) => node.elementId === isVisible);


    if (node) {
      const { category } = node || {};
      showIntercomIcon(!isVisible);

      const matched = products
        .filter((p) => (p.category && (p.category.toLowerCase() === category.toLowerCase())))
        .map((p) => (p._id === node.productId ? { ...p, active: true } : p));

      setMatchedProducts(matched);
    }

    return () => {
      setMatchedProducts([]);
    };
  }, [isVisible, products, nodes]);


  const stopPropagation = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onSelect = (nodeId, productId) => () => {
    onNodeSettingChange(nodeId, productId);
  };

  return (
    <div
      onClick={stopPropagation}
      className={`node-setting-modal ${isVisible ? 'open' : ''}`}
      role='presentation'
    >
      <div className='node-setting-header'>
        <span onClick={onClose} className='close-btn' role='presentation'>
          <i className='fas fa-times-circle' />
        </span>
        <span className='title'>
          Product Setting:
        </span>
      </div>
      <div className='node-products-list-container'>
        {
          matchProducts.map((product) => (
            <FunnelTemplateNode
              className='side-bar-nodes'
              key={product._id}
              onClick={onSelect(isVisible, product._id)}
              active={product.active}
              product={{
                image: product.thumbnail || product.pagePreferences.image,
                name: product.name
              }
              }
              {...product}
            />
          ))
        }
      </div>
    </div>
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

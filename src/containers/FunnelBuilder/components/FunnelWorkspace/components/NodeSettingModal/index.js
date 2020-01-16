import React, { useState, useEffect } from 'react';
import { IoMdClose } from 'react-icons/io';
import { showIntercomIcon } from 'libs';
import { connect } from 'react-redux';
import common from 'components/common';


import './style.css';

const {
  FlexBox,
  FunnelTemplateNode
} = common;

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
    <FlexBox
      column
      onClick={stopPropagation}
      className={`node-setting-modal ${isVisible ? 'open' : ''}`}
      role='presentation'
    >
      <FlexBox center='v-center' className='padding-v-10'>
        <FlexBox flex className='title margin-h-20'>
          Product Setting:
        </FlexBox>
        <IoMdClose onClick={onClose} className='gray-text animate margin-h-20 item-clickable' />
      </FlexBox>

      <FlexBox flex flexStart wrappable>
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
      </FlexBox>
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

export default connect(mapStateToProps)(NodeSettingModal);

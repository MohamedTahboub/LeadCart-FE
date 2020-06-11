import React, { useRef, useState } from 'react';
// import PropTypes from 'prop-types';
import common from 'components/common';
import clx from 'classnames';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { GoPlug } from 'react-icons/go';
import { MdDelete } from 'react-icons/md';
import pageFunnelImage from 'assets/images/funnels/PageFunnel.png';
import checkoutPageImage from 'assets/images/funnels/checkoutPage.png';
import upsellPageImage from 'assets/images/funnels/upsellPage.png';
import thankyouPageImage from 'assets/images/funnels/thankyouPage.png';
import { ConnectButton, EditButton, NodeStatusHat } from './components';
import './style.css';

const categoriesImages = {
  onepagefunnel: pageFunnelImage,
  checkout: checkoutPageImage,
  upsell: upsellPageImage,
  thankyoupage: thankyouPageImage
};

const categoriesNames = {
  onepagefunnel: 'Page Funnel',
  checkout: 'Checkout page',
  upsell: 'Upsell Page',
  thankyoupage: 'Thankyou Page'
};


const { FlexBox } = common;

const stringifyObj = (obj) => JSON.stringify(obj);
const Node = ({
  elementId,
  type: nodeType,
  product = {},
  category = 'checkout',
  productId,
  onEdit,
  toggleOptions,
  activeNode,
  relations,
  coordinates = {},
  onConnect,
  connectingMode,
  onConnected,
  onDelete
}) => {
  const elementRef = useRef(null);
  // const [connecting, setConnecting] = useState();
  const highlighted = activeNode === elementId;
  const classes = clx(
    'card-style',
    'funnel-node-card',
    { highlighted, connecting: connectingMode }
  );

  const nodePosition = {
    left: coordinates.x,
    top: coordinates.y
  };

  const nodeStyle = { ...nodePosition };

  const _onEdit = (e) => {
    e.stopPropagation();
    e.preventDefault();
    return onEdit(productId);
  };

  const onDragStart = ({ dataTransfer, clientX, clientY }) => {
    const stringifiedPayload = stringifyObj({ product, category, elementId });
    const {
      left,
      top,
      width,
      height
    } = elementRef.current.getBoundingClientRect();

    const shiftX = clientX - left;
    const shiftY = clientY - top;

    dataTransfer.setData('droppedElement', stringifiedPayload);
    dataTransfer.setData('shift', stringifyObj({ shiftX, shiftY, width, height }));
  };

  const onConnectStart = (type) => {
    onConnect(elementId, type);
  };
  const onConnectNode = (e) => {
    e.stopPropagation();
    onConnected(elementId);
  };
  const onNodeDelete = (e) => {
    e.stopPropagation();
    onDelete(elementId);
  };


  const bgImage = product.image ? product.image : categoriesImages[category.toLowerCase()];
  const name = product.name ? product.name : categoriesNames[category.toLowerCase()];


  const style = {
    backgroundImage: `linear-gradient(to bottom, #fff 5%, transparent 95%), url(${bgImage})`,
    backgroundPosition: 'center',
    backgroundSize: '105% 105%',
    backgroundRepeat: 'no-repeat'
  };

  const cardProps = {
    draggable: true,
    elementRef,
    onDragStart,
    onClick: () => toggleOptions(elementId)
  };

  const showStatusHate = category !== 'thankyoupage';
  return (
    <div className='funnel-node-container'>
      <FlexBox column className={classes} style={nodeStyle} {...cardProps}>
        <div className='node-title tiny-text  gray-text bold-text truncate p-2'>
          {name}
        </div>
        <FlexBox column style={style} className='content soft-edges'>
          {showStatusHate && (
            <NodeStatusHat
              active={productId}
              note={name}
            />
          )}
          {productId && (
            <EditButton onClick={_onEdit} />
          )}
        </FlexBox>
        {highlighted ? (
          <IoIosCloseCircleOutline
            onClick={cardProps.onClick}
            className='close-node-setting'
          />
        ) : !connectingMode && (
          <div className='connect-btn-container'>
            <ConnectButton
              position={nodePosition}
              onClick={onConnectStart}
            />
          </div>
        )}
        {connectingMode && (
          <div onClick={onConnectNode} className='node-connect-tail'>
            <GoPlug className='white-text large-text' />
          </div>
        )}
        {!connectingMode && (
          <div onClick={onNodeDelete} className='delete-btn-container'>
            <MdDelete
              data-tip='delete this node'
              className='danger-color larger-text'
            />
          </div>)
        }
      </FlexBox>
    </div>

  );
};

Node.propTypes = {};

export default Node;

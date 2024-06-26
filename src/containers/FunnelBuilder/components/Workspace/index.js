import React, { useRef, useState } from 'react';
import common from 'components/common';
import * as flashMessages from 'actions/flashMessage';
import { connect } from 'react-redux';
import ids from 'shortid';
import { notification } from 'libs';

import {
  Node,
  NodeSettingModal,
  RelationsWorkSpace,
  ShadowBackground
} from './components';

import './style.css';

const { FlexBox } = common;

const WorkSpace = ({
  category = 'checkout',
  onChange,
  funnel: {
    _id: funnelId,
    products: nodes = [],
    url: funnelUrl
  },
  productsNodeDetails,
  history,
  isOptInFunnel
}) => {
  const [connecting, setConnecting] = useState(false);
  const [showNodeSettingModal, setShowNodeSettingModal] = useState(false);

  const elementRef = useRef(null);

  const onDragOver = (event) => {
    event.stopPropagation();
    event.preventDefault();
  };


  const onDrop = (event) => {
    event.preventDefault();
    const data = event.dataTransfer.getData('droppedElement');
    const omo = event.dataTransfer.getData('shift');
    let node = {};

    node = JSON.parse(data);
    const originalMouseOffset = JSON.parse(omo);
    const coordinates = getElementPosition(
      event,
      originalMouseOffset,
      elementRef
    );
    if (node.elementId) {
      const isExist = nodes.find((n) => n.elementId === node.elementId);
      if (isExist) {
        const updatedList = nodes.map((n) => {
          if (n.elementId === node.elementId)
            return { ...n, coordinates };

          if (Array.isArray(n.relations)) {
            const nodeRelations = n.relations
              .map((relation) => {
                if (relation.target === node.elementId) relation.coordinates = coordinates;
                return relation;
              });
            return { ...n, relations: nodeRelations };
          }

          return n;
        });
        return onChange({
          name: 'products',
          value: updatedList
        });
      }
    }
    if (node.category === 'checkout' || node.category === 'thankyouPage') if (nodes.find(({ category }) => node.category === category)) notification.failed(`The funnel accepts one ${category.toUpperCase()} product`);

    const updatedList = [
      ...nodes,
      {
        elementId: ids.generate(),
        ...node,
        coordinates
      }];

    onChange({
      name: 'products',
      value: updatedList
    });
  };


  const onConnectNode = (currentId, type) => {
    setConnecting({ currentId, type });
  };


  const onNodeConnectionCancel = (targetId, elementId) => {
    const updatedList = [...nodes].map((node) => {
      if (node.elementId === elementId)
        return { ...node, relations: [...node.relations].filter(({ target = '' }) => target !== targetId) };

      return node;
    });

    onChange({
      name: 'products',
      value: updatedList
    });
  };

  const onNodeConnected = (targetId) => {
    const { currentId, type } = connecting;
    setConnecting(false);

    const targetElement = nodes.find(({ elementId }) => elementId === targetId);

    if (!targetElement) return;


    const updatedList = nodes.map((node) => {
      if (node.elementId === currentId) {
        const relation = {
          target: targetId,
          coordinates: targetElement.coordinates,
          type
        };

        if (Array.isArray(node.relations)) {
          const isExist = node.relations.find((relation) => relation.target === targetId);
          if (
            isExist
            || (node.category === 'checkout' && node.relations.length >= 1)
            || (node.relations.length >= 2)
          ) return node;


          return { ...node, relations: [...node.relations, relation] };
        } else {
          return { ...node, relations: [relation] };
        }
      }
      return node;
    });

    onChange({
      name: 'products',
      value: updatedList
    });
  };


  const cleanUpWorkSpace = () => {
    setConnecting(false);
    // setShowNodeOptions(false);
  };

  const onNodeDelete = (elementId) => {
    const updatedList = nodes
      .filter((node) => node.elementId !== elementId)
      .map((node) => {
        if (Array.isArray(node.relations)) node.relations = node.relations.filter((relation) => relation.target !== elementId);
        return node;
      });

    onChange({
      name: 'products',
      value: updatedList
    });
  };

  const onNodeSetting = (id) => {
    setShowNodeSettingModal(id);
  };
  const onToggleNodeSettings = (id) => {
    const status = showNodeSettingModal !== id ? id : undefined;
    setShowNodeSettingModal(status);
  };

  const onNodeSettingChange = (id, productId) => {
    const updatedList = nodes.map((node) => {
      if (node.elementId === id) return { ...node, productId: node.productId === productId ? '' : productId };

      return node;
    });
    onChange({
      name: 'products',
      value: updatedList
    });
  };


  const onProductEdit = (productId) => {
    if (!productId) return;
    history.push(`${funnelUrl}/products/${productId}`);
  };

  const nodeProps = {
    highlighted: showNodeSettingModal,
    toggleOptions: onToggleNodeSettings,
    onEdit: onProductEdit,
    onConnectNode,
    activeNode: showNodeSettingModal,
    onNodeDelete
  };

  return (
    <FlexBox className='relative-element' flex>
      <RelationsWorkSpace nodes={nodes} isOptInFunnel={isOptInFunnel} />
      <div
        onDragOver={onDragOver}
        onDrop={onDrop}
        ref={elementRef}
        onClick={cleanUpWorkSpace}
        id='funnel-workspace'
        className={`funnel-work-space ${connecting ? 'connecting-mode' : ''}`}
        role='presentation'
      >
        {nodes.map((node) => (
          <Node
            key={node.elementId}
            onConnect={onConnectNode}
            connectingMode={connecting}
            onConnected={onNodeConnected}
            onCancelConnection={onNodeConnectionCancel}
            onDelete={onNodeDelete}
            {...node}
            {...nodeProps}
            product={productsNodeDetails[node.productId]}
            connectingElement={connecting.currentId}
            isOptInFunnel={isOptInFunnel}
          />
        ))}
        <ShadowBackground show={showNodeSettingModal} setShowNodeSettingModal={setShowNodeSettingModal} />
        <NodeSettingModal
          show={showNodeSettingModal}
          nodes={nodes}
          onNodeSettingChange={onNodeSettingChange}
          onClose={() => onNodeSetting()}
          funnelUrl={funnelUrl}
          funnelId={funnelId}
          history={history}
          isOptInFunnel={isOptInFunnel}
        />

      </div>
    </FlexBox>
  );
};

function getElementPosition (event, originalMouseOffset, parentRef) {
  const {
    left: parentLeft,
    top: parentTop
  } = parentRef.current.getBoundingClientRect();

  const {
    pageX,
    pageY
  } = event;
  const { shiftX, shiftY, height, width } = originalMouseOffset;
  const c = {
    x: pageX - shiftX - parentLeft - 15,
    y: pageY - shiftY - parentTop - 5,
    shiftX,
    shiftY,
    height,
    width
  };
  return c;
}


export default connect(null, flashMessages)(WorkSpace);

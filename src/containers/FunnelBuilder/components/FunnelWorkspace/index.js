import React, { useState, useRef, Fragment } from 'react';
// import PropTypes from 'prop-types';
import common from 'components/common';
import * as flashMessages from 'actions/flashMessage';
import { connect } from 'react-redux';
import ids from 'shortid';

// import targetMouseIcon from 'assets/images/icons/targetIcon.png';

import { RelationsWorkSpace, NodeSettingModal } from './components';

import './style.css';

const { FunnelNode, FlexBox } = common;

const FunnelWorkSpace = ({
  category = 'checkout',
  onChange,
  funnel: {
    products: nodes = [],
  },
  productsNodeDetails,
  showFlashMessage,
  ...props
}) => {
  const [connecting, setConnecting] = useState(false);
  const [showNodeOptions, setShowNodeOptions] = useState(false);
  const [showNodeSettingModal, setShowNodeSettingModal] = useState(false);

  // const [currentNodeRelation, setCurrentNodeRelation] = useState({})

  const elementRef = useRef(null);

  const onDragOver = (event) => {
    event.stopPropagation();
    event.preventDefault();
  };


  // function updateNodesPosition(nodeId, event, originalMouseOffset) {
  //   const { shiftX, width } = originalMouseOffset;

  //   const { pageX: x, pageY: y } = event;

  //   const updatedRelations = relations.map(relation => {
  //     if (relation.currentId === nodeId) {
  //       relation.from = {
  //         x1: x + (width - shiftX),
  //         y1: y
  //       }
  //     }

  //     if (relation.targetId === nodeId) {
  //       relation.to = {
  //         x2: x - shiftX - 15,
  //         y2: y
  //       }
  //     }

  //     return relation
  //   })
  //   setRelations(updatedRelations)
  // }

  const onDrop = (event) => {
    event.preventDefault();
    const data = event.dataTransfer.getData('dropedElement');
    const omo = event.dataTransfer.getData('shift');
    let node = {};

    node = JSON.parse(data);
    const originalMouseOffset = JSON.parse(omo);
    // /?! Validate the droped Node
    // if (node && node.id && node.src) {
    // eslint-disable-next-line
    const coordinates = getElementPosition(
      event,
      originalMouseOffset,
      elementRef
    );
    if (node.elementId) {
      const isExist = nodes.find((n) => n.elementId === node.elementId);
      if (isExist) {
        const updatedList = nodes.map((n) => {
          if (n.elementId === node.elementId) {
            // console.log({ ...n, coordinates })
            return { ...n, coordinates };
          }
          if (Array.isArray(n.relations)) {
            const nodeRelations = n.relations
              .map((relation) => {
                if (relation.target === node.elementId) relation.coordinates = coordinates;
                return relation;
              });
              // n.relations = nodeRelations
            return { ...n, relations: nodeRelations };
          }

          return n;
        });
        return onChange({
          name: 'products',
          value: updatedList
        });
        // return setNodes(updatedList);
      }
    }
    if (node.category === 'checkout' || node.category === 'thankyouPage') {
      if (nodes.find(({ category }) => node.category === category)) {
        // err
        return showFlashMessage({
          type: 'failed',
          message: `The funnel accepts one ${category.toUpperCase()} product`
        });
      }
    }
    // const newNodes = nodes.filter((n) => n.id !== node.id);
    // newNodes.push(node);
    const updatedList = [
      ...nodes,
      {
        elementId: ids.generate(),
        ...node,
        coordinates,
      }];

    // setNodes(updatedList);
    onChange({
      name: 'products',
      value: updatedList
    });
    // }
    // /?! update the state with the Node
  };


  const onConnectNode = (currentId, type) => {
    //
    setConnecting({ currentId, type });
    // setCurrentNodeRelation({
    //   currentId,
    //   from: {
    //     x1: e.pageX,
    //     y1: e.pageY,
    //   }
    // })

    // docume
    // document.body.cursor = `url(${targetMouseIcon})`;
  };

  // const iselationExist = (currentId, targetId) => {
  //   return relations.find(relation => (relation.currentId === currentId && relation.targetId === targetId))
  // }

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


          node.relations.push(relation);
        } else {
          node.relations = [relation];
        }
      }
      return node;
    });

    // const updatedRelations = [
    //   ...relations,
    //   {
    //     ...currentNodeRelation,
    //     currentId: connecting,
    //     targetId,
    //   }
    // ];

    // setRelations(updatedRelations);
    onChange({
      name: 'products',
      value: updatedList
    });
    // setCurrentNodeRelation({})
    // document.body.cursor = 'inherit';
  };


  const cleanUpWorkSpace = () => {
    setConnecting(false);
    setShowNodeOptions(false);
    // onNodeSetting()
  };

  const onShowNodeOptions = (id) => {
    setShowNodeOptions(id);
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

  return (
    <FlexBox className='relative-element' flex>
      <RelationsWorkSpace nodes={nodes} />
      <div
        onDragOver={onDragOver}
        onDrop={onDrop}
        ref={elementRef}
        onClick={cleanUpWorkSpace}
        id='funnel-workspace'
        className={`funnel-work-space ${connecting ? 'node-connecting' : ''} ${connecting ? 'connecting-mode' : ''}`}
        role='presentation'
      >
        {nodes.map((node) => (
          <FunnelNode
            className='fixable-product-node'
            key={node.elementId}
            id={node.elementId}
            onShowNodeOptions={onShowNodeOptions}
            activeNodeOptions={showNodeOptions}
            onConnect={onConnectNode}
            connectingMode={connecting}
            onNodeSetting={onNodeSetting}
            onNodeDelete={onNodeDelete}
            onConnected={onNodeConnected}
            activeSetting={showNodeSettingModal}
            product={productsNodeDetails[node.productId]}
            {...node}
          />
        ))}
        <NodeSettingModal
          show={showNodeSettingModal}
          nodes={nodes}
          onNodeSettingChange={onNodeSettingChange}
          onClose={() => onNodeSetting()}
        />

      </div>
    </FlexBox>
  );
};

function getElementPosition (event, originalMouseOffset, parentRef) {
  const {
    left: parentLeft,
    top: parentTop,
  } = parentRef.current.getBoundingClientRect();

  // event.preventDefault();
  const {
    // clientX,
    // clientY,
    pageX,
    pageY
  } = event;
  const {
    shiftX, shiftY, height, width
  } = originalMouseOffset;

  // console.log("=====================");
  // console.log("clientX , clientY , pageX , pageY , shiftX, shiftY");
  // console.log(shiftX, shiftY);


  // 15 & 5 are the margin offsets of the start element
  const c = {
    x: pageX - shiftX - parentLeft - 15,
    y: pageY - shiftY - parentTop - 5,
    shiftX,
    shiftY,
    height,
    width
  };

  console.log(c);

  return c;
}


export default connect(null, flashMessages)(FunnelWorkSpace);


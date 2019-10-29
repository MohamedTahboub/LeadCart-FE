import React, { useState, useRef, Fragment } from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import * as flashMessages from 'actions/flashMessage';
import { connect } from 'react-redux';
import ids from 'shortid';

import targetMouseIcon from 'assets/images/icons/targetIcon.png';

import { RelationsWorkSpace, NodeSettingModal } from './components';

import './style.css';

const { FunnelNode } = common;

const FunnelWorkSpace = ({
  category = 'checkout',
  showFlashMessage,
  ...props
}) => {
  const [nodes, setNodes] = useState([]);
  const [relations, setRelations] = useState([]);
  const [connecting, setConnecting] = useState(false);
  const [showNodeOptions, setShowNodeOptions] = useState(false);
  const [showNodeSettingModal, setShowNodeSettingModal] = useState(false)

  const [currentNodeRelation, setCurrentNodeRelation] = useState({})

  const elementRef = useRef(null);

  const onDragOver = (event) => {
    // console.log(e.screenX);
    event.stopPropagation();
    event.preventDefault();
    // const { left, top } = findElementPostition(elementRef.current);
    // console.log(left, top);
  };


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
    const position = getElementPosition(
      event,
      originalMouseOffset,
      elementRef
    );

    if (node.id) {
      const isExist = nodes.find((n) => n.id === node.id);

      if (isExist) {
        const updatedList = nodes.map((n) => {
          if (n.id === node.id) return { ...n, ...node, position };
          return n;
        });
        return setNodes(updatedList);
      }
    } else {
      node.id = ids.generate();
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
    setNodes([...nodes, { ...node, position }]);
    console.log(position);
    // }
    // /?! update the state with the Node
  };


  const onConnectNode = (currentId, e) => {

    //
    setConnecting(currentId);
    setCurrentNodeRelation({
      currentId,
      from: {
        x1: e.pageX,
        y1: e.pageY,
      }
    })
    console.log(e.pageX, e.pageY)

    // docume
    // document.body.cursor = `url(${targetMouseIcon})`;
  };
  const onNodeConnected = (targetId, e) => {
    console.log(e.pageX, e.pageY)

    setConnecting(false);

    currentNodeRelation.to = {
      x2: e.pageX,
      y2: e.pageY,
    }
    setRelations([
      ...relations,
      {
        ...currentNodeRelation,
        currentId: connecting,
        targetId,
      }
    ]);
    setCurrentNodeRelation({})
    // document.body.cursor = 'inherit';
  };

  console.log(relations);

  const cleanUpWorkSpace = () => {
    setConnecting(false);
    setShowNodeOptions(false);
    // onNodeSetting()
  };

  const onShowNodeOptions = (id) => {
    setShowNodeOptions(id);
  };

  const onNodeDelete = (id) => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
  };

  const onNodeSetting = (id) => {
    console.log('Setting');
    setShowNodeSettingModal(id)
  };


  return (
    <Fragment>
      <RelationsWorkSpace relations={relations} />
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
            key={node.id}
            id={node.id}
            onShowNodeOptions={onShowNodeOptions}
            activeNodeOptions={showNodeOptions}
            onConnect={onConnectNode}
            connectingMode={connecting}
            onNodeSetting={onNodeSetting}
            onNodeDelete={onNodeDelete}
            onConnected={onNodeConnected}
            activeSetting={showNodeSettingModal}
            {...node}
          />
        ))}
        {showNodeSettingModal && <NodeSettingModal
          show={showNodeSettingModal}
          nodes={nodes}
          onClose={() => onNodeSetting()}
        />
        }
      </div>
    </Fragment>
  );
};

// {
//   relations.map((relation) => <NodeRelation {...relation} />)
// }
/*

     <span className='add-upsell-btn'>
        <i className='fas fa-plus' />
      </span>
*/


function getElementPosition(event, originalMouseOffset, parentRef) {
  const {
    left: parentLeft,
    top: parentTop
  } = parentRef.current.getBoundingClientRect();

  // event.preventDefault();
  const {
    clientX,
    clientY,
    // pageX,
    // pageY
  } = event;
  const { shiftX, shiftY } = originalMouseOffset;

  // console.log("=====================");
  // console.log("clientX , clientY , pageX , pageY , shiftX, shiftY");
  // console.log(shiftX, shiftY);


  // 15 & 5 are the margin offsets of the start element
  const position = {
    left: clientX - shiftX - parentLeft - 15,
    top: clientY - shiftY - parentTop - 5
  };

  return { ...position };
}


export default connect(null, flashMessages)(FunnelWorkSpace);


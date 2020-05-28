import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ThreadPath } from '../../RelationsWorkSpace/components/NodeRelation/Wire';

const cardShape = {
  height: 180,
  width: 120,
  marginTop: 5,
  marginBottom: 5,
  marginLeft: 15,
  marginRight: 15
};


const ConnectingMode = ({ connecting, coords = {} }) => {
  if (!connecting) return null;

  const xOffset = cardShape.width + cardShape.marginRight;
  const yOffset = cardShape.height / 2 + cardShape.marginTop;
  const { x, y } = coords;

  const pathStart = { x: x + xOffset, y: y + yOffset };
  const pathEnd = {
    coordinates: {
      x: pathStart.x + 20,
      y: pathStart.y
    }
  };

  //   const onToggleConnecting = () => useConnecting((connect) => !connect);
  return (
    <div className='connect-node-assets'>
      <div
        style={{
          left: pathStart.x,
          top: pathStart.y
        }}
        className='grab-handle'
        draggable
      />
      <svg
        className='node-dynamic-relation-space'
        width='100%'
        height='100%'
      >
        <ThreadPath
          start={pathStart}
          relation={pathEnd}
        />
      </svg>
    </div>
  );
};

ConnectingMode.propTypes = {};

export default ConnectingMode;

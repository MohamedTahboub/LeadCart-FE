import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ThreadPath } from '../../RelationsWorkSpace/components/NodeRelation/Wire';

const ConnectingMode = ({ connecting, coords = {} }) => {
  if (!connecting) return null;

  const { x, y } = coords;

  const pathStart = { x, y };
  const pathEnd = {
    coordinates: {
      x: x + 20,
      y: y
    }
  };

  //   const onToggleConnecting = () => useConnecting((connect) => !connect);
  return (
    <div className='connect-node-assets'>
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

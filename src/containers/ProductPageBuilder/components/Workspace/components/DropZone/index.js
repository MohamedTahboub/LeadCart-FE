import React, { useState } from 'react';
import common from 'components/common';
import './style.css';
import clx from 'classnames';
import { useDrop } from 'react-dnd';
// import { useContext } from '../../../../actions';
import * as dropTypes from '../dropTypes';

const {
  Button,
  FlexBox

} = common;

export default ({
  children,
  onDrop,
  ...props
}) => {
  const [collectedProps, drop] = useDrop({
    accept: dropTypes.SECTION,
    drop: (item, monitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop) return;
      onDrop(item);
    }
  });

  const className = clx({ 'product-drop-zone': true });

  return (
    <div
      className={className}
      // onDragOver={onDragOver}
      // onDrop={onDrop}
      ref={drop}
    >
      {children}
    </div>
  );
};

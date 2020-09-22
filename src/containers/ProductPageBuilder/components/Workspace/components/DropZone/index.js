import React from 'react';
import './style.css';
import clx from 'classnames';
import { useDrop } from 'react-dnd';
import * as dropTypes from '../dropTypes';


export default ({ children, onDrop }) => {
  const [, drop] = useDrop({
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
      ref={drop}
    >
      {children}
    </div>
  );
};

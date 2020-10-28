import React from 'react';
import './style.css';
import clx from 'classnames';
import { useDrop } from 'react-dnd';
import * as dropTypes from '../dropTypes';


export default ({ children, parentZone, onDrop, style }) => {

  const [, drop] = useDrop({
    accept: dropTypes.SECTION,
    drop: (item, monitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop) return;
      const itemDetails = { ...item };
      console.log({ ...itemDetails, parentZone });
      onDrop({ ...itemDetails, parentZone });
    }
  });

  const className = clx({ 'product-drop-zone': true });

  return (
    <div
      className={className}
      ref={drop}
      style={style}
    >
      {children}
    </div>
  );
};

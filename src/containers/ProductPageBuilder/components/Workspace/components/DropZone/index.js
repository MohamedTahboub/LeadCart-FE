import React from 'react';
import './style.css';
import clx from 'classnames';
import { useDrop } from 'react-dnd';
import * as dropTypes from '../dropTypes';


export default ({ children, parentZone, onDrop }) => {

  const [, drop] = useDrop({
    accept: dropTypes.SECTION,
    drop: (item, monitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop) return;
      let itemDetails = {...item};

      
      onDrop({ ...itemDetails, parentZone });
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

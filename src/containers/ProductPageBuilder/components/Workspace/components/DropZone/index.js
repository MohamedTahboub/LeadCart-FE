import React from 'react';
import './style.css';
import clx from 'classnames';
import { useDrop } from 'react-dnd';
import * as dropTypes from '../dropTypes';

const checkIsOverMidWay = ({ dragIndex, hoverIndex, ref, monitor }) => {
  const hoverBoundingRect = ref.current?.getBoundingClientRect();
  const hoverMiddleY =
    (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
  const clientOffset = monitor.getClientOffset();
  const hoverClientY = clientOffset.y - hoverBoundingRect.top;

  if (
    // Dragging downwards
    (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) ||
    // Dragging upwards
    (dragIndex > hoverIndex && hoverClientY > hoverMiddleY)
  ) return false;

  return true;
};

export default ({ children, parentZone, onDrop, moveCard, style }) => {

  const [, drop] = useDrop({
    accept: dropTypes.SECTION,
    drop: (item, monitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop) return;
      const itemDetails = { ...item };
      if (!isNaN(itemDetails.originalIndex) && itemDetails.section)
        return moveCard(itemDetails.section.id, itemDetails.originalIndex, parentZone);


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

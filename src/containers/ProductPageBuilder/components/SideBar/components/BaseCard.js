import React from 'react';
import PropTypes from 'prop-types';
import clx from 'classnames';
import { useDrag, useDrop } from 'react-dnd';

const ItemTypes = {
  CARD: 'card',
};

const ElementCard = ({
  type,
  className,
  id,
  moveCard,
  findCard,
  ...props
}) => {
  // const originalIndex = findCard(id).index;

  const [{ isDragging }, drag] = useDrag({
    item: { type: 'card', sectionType: type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    // end: (dropResult, monitor) => {
    //   const { id: droppedId, originalIndex } = monitor.getItem();
    //   const didDrop = monitor.didDrop();
    //   if (!didDrop) moveCard(droppedId, originalIndex);
    // },
  });


  const classNames = clx({
    'base-element-card': true,
    [className]: className
  });


  return (
    <div
      className={classNames}
      {...props}
      ref={(node) => drag(node)}
    // onDragStart={onDragStart}
    />
  );
};

ElementCard.propTypes = {

};

export default ElementCard;

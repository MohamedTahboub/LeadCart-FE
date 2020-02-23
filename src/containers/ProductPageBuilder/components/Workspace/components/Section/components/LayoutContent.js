import React from 'react';
import PropTypes from 'prop-types';
import clx from 'classnames';
// import Section from '../index';
import { useDrag, useDrop } from 'react-dnd';
import * as dropTypes from '../../dropTypes';

const NestedSection = (props) => {
  const [{ isDragging }, dragConnect] = useDrag({
    item: {
      type: dropTypes.SECTION,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    }),
    end: (dropResult, monitor) => {
      const { id: droppedId, originalIndex } = monitor.getItem();
      const didDrop = monitor.didDrop();
      // if (!didDrop) moveCard(droppedId, originalIndex);
    },
  });

  const [, drop] = useDrop({
    type: dropTypes.SECTION,
    // canDrop: () => false,
    // hover: ({ id: draggedId }, monitor) => {
    //   const item = monitor.getItem();
    //   if (item.type === 'card' && item.id) {
    //     const { index: overIndex } = findCard(item.id);
    //     return moveCard(draggedId, overIndex);
    //   }

    //   if (item.type === 'card' && !item.id) {

    //   }
    // console.log('draggedId', id, draggedId);
    // if (draggedId !== id) {
    //   const { index: overIndex } = findCard(id);
    //   moveCard(draggedId, overIndex);
    // }
    // },
  });

  return (
    <div
      ref={dragConnect}
      className='nested-section'
    />
  );
};
const LayoutContent = ({
  className,
}) => {
  const classNames = clx({
    'layout-section': true,
    [className]: className,
  });

  return (
    <div className={classNames}>
      <div className='item' />
      <div className='item' />
      <div className='item' />
    </div>
  );
};

LayoutContent.propTypes = {

};

export default LayoutContent;

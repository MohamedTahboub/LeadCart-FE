import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clx from 'classnames';
// import common from 'components/common';
import { useDrag, useDrop } from 'react-dnd';
import ids from 'shortid';
import * as dropTypes from '../dropTypes';

import './style.css';
import {
  SectionContent,
  SettingsHandles
} from './components';

const Section = ({
  id,
  className,
  hidden,
  type,
  content,
  style = {},
  order,
  maxOrder,
  moveCard,
  findCard,
  section,
  active,
  activeSection = {},
  onSectionDuplicate,
  addNewAndMove,
  onSetting,
  index,
  // onSectionOrderChange,
  ...props
}) => {
  const [isDraggable, setIsDraggable] = useState(true);

  const originalIndex = findCard(id).index;

  const [{ isDragging }, drag] = useDrag({
    item: { type: dropTypes.SECTION, section, originalIndex },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    }),
    canDrag: () => isDraggable
  });

  const [{ isOver }, drop] = useDrop({
    accept: dropTypes.SECTION,
    collect: (monitor) => ({
      isOver: monitor.isOver()
    }),
    // canDrop: (e) => console.log('Can Drop', e),
    drop: ({ new: newItem, section: { id: droppedItemId, type } = {} }, monitor) => {
      // const didDrop = monitor.didDrop();
      // if (didDrop) return;

      if (newItem) {
        const newId = ids.generate();
        addNewAndMove({
          atIndex: index,
          type,
          id: newId
        });
        return { isHandled: true };
      }
      const { index: overIndex } = findCard(id);
      moveCard(droppedItemId, overIndex);
      return { isHandled: true };
    }
  });


  const classes = clx({
    'product-section': true,
    'isDragging': isDragging,
    'active': activeSection.id === id,
    [className]: className,
    [content.position]: content.position
  });

  const onDuplicate = (fromId) => () => {
    onSectionDuplicate(fromId);
  };

  const onUpdateDragging = (state) => {
    setIsDraggable(state);
  };
  return (
    <div
      id={id}
      className={classes}
      style={{
        ...style,
        opacity: (isDragging || isOver) ? 0.3 : 1
      }}
      ref={(node) => drop(drag(node))}
    >
      <SettingsHandles
      // onOrderChange={onSectionOrderChange}
        onSettings={onSetting}
        onDuplicate={onDuplicate}
        section={section}
        order={order}
        id={id}
        maxOrder={maxOrder}
      />
      <SectionContent
        onUpdateDragging={onUpdateDragging}
        type={type}
        section={section}
        language={props.language}
        {...content}
      />
    </div>
  );
};

Section.propTypes = {

};

export default Section;

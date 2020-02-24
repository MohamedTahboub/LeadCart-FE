import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import clx from 'classnames';
// import common from 'components/common';
import { useDrag, useDrop } from 'react-dnd';
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
  onSetting,
  onSectionOrderChange,
  ...props
}) => {
  // if (hidden) return null;
  const sectionRef = useRef(null);
  const originalIndex = findCard(id).index;

  const [{ isDragging }, drag] = useDrag({
    item: { type: dropTypes.SECTION, section, originalIndex },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    }),
    end: (dropResult, monitor) => {
      const { id: droppedId, originalIndex } = monitor.getItem();
      const didDrop = monitor.didDrop();
      if (!didDrop) moveCard(droppedId, originalIndex);
    },
  });

  const [, drop] = useDrop({
    accept: dropTypes.SECTION,
    canDrop: () => false,
    hover: ({ id: draggedId }, monitor) => {
      const item = monitor.getItem();
      console.log('item==> ', item, monitor.canDrop());
      if (item.type === dropTypes.SECTION && item.id) {
        const { index: overIndex } = findCard(item.id);
        return moveCard(draggedId, overIndex);
      }

      if (item.type === dropTypes.SECTION && !item.id) {

        // add new temp item
      }
      // console.log('draggedId', id, draggedId);
      // if (draggedId !== id) {
      //   const { index: overIndex } = findCard(id);
      //   moveCard(draggedId, overIndex);
      // }
    },
  });


  const classes = clx({
    'product-section': true,
    'isDragging': isDragging,
    'active': active,
    [className]: className
  });

  return (
    <div
      className={classes}
      style={{
        ...style,
        opacity: isDragging ? 0.3 : 1
      }}
      ref={(node) => drop(drag(node))}
    >
      <SettingsHandles
        onOrderChange={onSectionOrderChange}
        onSettings={onSetting}
        section={section}
        order={order}
        id={id}
        maxOrder={maxOrder}
      />
      <SectionContent
        type={type}
        section={section}
        {...content}
      />
    </div>
  );
};

Section.propTypes = {

};

export default Section;

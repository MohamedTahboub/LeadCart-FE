import React, {
  // useRef,
  // useEffect,
  useState,
  Fragment
} from 'react';
// import PropTypes from 'prop-types';
import clx from 'classnames';
// import common from 'components/common';
import { useDrag, useDrop } from 'react-dnd';
import ids from 'shortid';
import * as dropTypes from '../dropTypes';
import './style.css';
import {
  DropBeforeLine,
  SectionContent,
  SettingsHandles
} from './components';
import { useContext } from '../../../../actions';
import update from 'immutability-helper';

const Section = ({
  id,
  className,
  type,
  content,
  style = {},
  order,
  maxOrder,
  moveCard,
  findCard,
  section,
  activeSection = {},
  onSectionDuplicate,
  addNewAndMove,
  onSetting,
  index,
  ...props
}) => {
  const { actions, state: { dndEnabled = true } } = useContext();
  const [hoveredItem, setHoveredItem] = useState(null);
  const originalIndex = findCard(id).index;

  const [{ isDragging }, drag] = useDrag({
    item: { type: dropTypes.SECTION, section, originalIndex },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
    canDrag: () => dndEnabled
  });

  const onDrop = (item, monitor) => {
    const { new: newItem, parentSectionId, section: { id: droppedItemId, type } = {} } = item;
    if (monitor && monitor.didDrop()) return;
    if (parentSectionId) {
      const { section } = findCard(parentSectionId);
      const nested = section.content.sections;
      const nestedSectionIndex = nested.findIndex(({ id }) => droppedItemId === id);
      const newNestedSections = update(nested, {
        $splice: [
          [nestedSectionIndex, 1]
        ]
      });
      actions.addNewSection(nested[nestedSectionIndex]);
      actions.onSectionSettingChange({
        section,
        field: {
          name: 'content.sections',
          value: newNestedSections
        }
      });
      return;
    }
    if (newItem) {
      const id = ids.generate();
      addNewAndMove({
        atIndex: index,
        type,
        id
      });
      return { isHandled: true };
    }
    const { index: overIndex } = findCard(id);
    moveCard(droppedItemId, overIndex);
    return { isHandled: true };
  };

  const [{ isOver }, drop] = useDrop({
    accept: [dropTypes.SECTION, dropTypes.NESTED_SECTION],
    collect: (monitor) => ({ isOver: monitor.isOver() }),
    hover: (item, monitor) => {
      const isOver = monitor.isOver();
      if (item.section.id === section.id) return;
      if (item.parentSectionId === section.id) return;
      setHoveredItem(item);
      if (!isOver) eraseShallowSections();
    },
    drop: onDrop
  });


  const classes = clx({
    'layout-product-section': type === 'layout',
    'product-section': true,
    'isDragging': isDragging,
    'active': activeSection.id === id,
    'new-dorp-space-line': isOver,
    [className]: className,
    [content.position]: content.position
  });

  const onDuplicate = (fromId) => () => {
    onSectionDuplicate(fromId);
  };
  const eraseShallowSections = () => {
    const { content: { sections: nestedSections } } = section;
    if (!nestedSections) return;
    const hasShallow = nestedSections.find(({ shallow }) => shallow);
    if (!hasShallow) return;
    const newNestedSections = nestedSections.filter(({ shallow }) => !shallow);
    actions.onSectionSettingChange({
      section,
      field: {
        name: 'content.sections',
        value: newNestedSections
      }
    });
  };
  return (
    <div
      ref={(node) => drop(drag(node))}
      id={id}
    >
      <DropBeforeLine show={isOver} item={hoveredItem}/>
      <div
        className={classes}
        style={style}
      >
        <SettingsHandles
          onSettings={onSetting}
          onDuplicate={onDuplicate}
          section={section}
          order={order}
          id={id}
          maxOrder={maxOrder}
        />
        <SectionContent
          type={type}
          section={section}
          language={props.language}
          onDrop={onDrop}
          {...content}
        />
      </div>
    </div>
  );
};

Section.propTypes = {};

export default Section;

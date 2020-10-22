import React from 'react';
import clx from 'classnames';
import { useDrag, useDrop } from 'react-dnd';
import ids from 'shortid';

import { DropBeforeLine, SectionContent, SettingsHandles } from './components';
import * as dropTypes from '../dropTypes';
import { useContext } from '../../../../actions';

import './style.css';

const Section = ({
  id,
  className,
  type,
  content= {},
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
  parentZone,
  ...props
}) => {
  const { state: { product: { category } = {} } } = useContext();
  const isThankYouProductPage = category === 'thankyoupage';
  const isisOptInProduct = category === 'opt-in';
  const originalIndex = findCard(id).index;

  const [{ isDragging }, drag] = useDrag({
    item: { type: dropTypes.SECTION, section, originalIndex },
    collect: (monitor) => ({ isDragging: monitor.isDragging() })
  });

  const [{ isOver }, drop] = useDrop({
    accept: dropTypes.SECTION,
    collect: (monitor) => ({ isOver: monitor.isOver() }),
    drop: ({ new: newItem, section: { id: droppedItemId, type } = {} }) => {

      if (newItem) {
        const newId = ids.generate();
        addNewAndMove({
          atIndex: index,
          type,
          parentZone,
          id: newId
        });
        return { isHandled: true };
      }
      const { index: overIndex } = findCard(id);
      moveCard(droppedItemId, overIndex, parentZone);
      return { isHandled: true };
    }
  });

  const classes = clx({
    'product-section': true,
    'isDragging': isDragging,
    'active': activeSection.id === id,
    'new-dorp-space-line': isOver,
    [className]: className,
    [content.position]: content.position
  });

  const onDuplicate = (fromId) => () => {
    onSectionDuplicate(fromId,parentZone);
  };

  return (
    <div
      ref={(node) => drop(drag(node))}
      id={id}
    >
      <DropBeforeLine show={isOver} />
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
          moveCard={moveCard}
          index={index}
          isThankYouProductPage={isThankYouProductPage}
          isisOptInProduct={isisOptInProduct}
        />
        <SectionContent
          {...content}
          type={type}
          section={section}
          language={props.language}
          hasMentions={isThankYouProductPage}
        />
      </div>
    </div>
  );
};

Section.propTypes = {};

export default Section;

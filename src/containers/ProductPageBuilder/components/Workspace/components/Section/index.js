import React from 'react';
import clx from 'classnames';
import { useDrag, useDrop } from 'react-dnd';
import ids from 'shortid';

import { DropBeforeLine, SectionContent, SettingsHandles } from './components';
import * as dropTypes from '../dropTypes';
import { useContext } from '../../../../actions';

import './style.css';

const getSectionStyles = (styles = {}, ignore) => {

  const currentProperties = {
    marginTop: styles.marginTop,
    marginRight: styles.marginRight,
    marginBottom: styles.marginBottom,
    marginLeft: styles.marginLeft,
    paddingTop: styles.paddingTop,
    paddingRight: styles.paddingRight,
    paddingBottom: styles.paddingBottom,
    paddingLeft: styles.paddingLeft,
    borderRadius: styles.borderRadius,
    borderTopLeftRadius: styles.borderTopLeftRadius,
    borderTopRightRadius: styles.borderTopRightRadius,
    borderBottomLeftRadius: styles.borderBottomLeftRadius,
    borderBottomRightRadius: styles.borderBottomRightRadius,
    boxShadowOffsetX: styles.boxShadowOffsetX,
    boxShadowOffsetY: styles.boxShadowOffsetY,
    boxShadowBlur: styles.boxShadowBlur,
    shadowColor: styles.shadowColor
  };

  const style = Object
    .keys(currentProperties)
    .filter((key) => currentProperties[key])
    .reduce((style, propKey) => {
      style[propKey] = currentProperties[propKey];
      return style;
    }, {});

  if (styles.backgroundType === 'image') {
    style.backgroundImage = `url(${styles.backgroundImage})`;
    style.backgroundSize = 'cover';
    style.backgroundRepeat = 'no-repeat';
  } else {style.backgroundColor = styles.backgroundColor;}

  if (styles.hasShadow)
    style.boxShadow = styles.hasShadow ? `${styles.boxShadowOffsetX || 0}px ${styles.boxShadowOffsetY || 0}px ${styles.boxShadowBlur || 0}px ${styles.shadowColor || '#FFF'}` : '';

  return ignore ? {} : style;
};


const Section = ({
  id,
  className,
  type,
  content = {},
  styles = {},
  order,
  maxOrder,
  moveCard,
  findCard,
  section,
  activeSection = {},
  onSectionDuplicate,
  addNewAndMove,
  onSetting,
  moveCrossColumns,
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
    onSectionDuplicate(fromId, parentZone);
  };
  const isCheckoutForm = section.type === 'checkoutSection';
  const style = getSectionStyles(styles, !isCheckoutForm);
  return (
    <div
      ref={(node) => drop(drag(node))}
      id={id}
    >
      <DropBeforeLine show={isOver} />
      <div
        className={classes}
      >
        <div style={style}>
          <SettingsHandles
            onSettings={onSetting}
            onDuplicate={onDuplicate}
            section={section}
            order={order}
            id={id}
            maxOrder={maxOrder}
            moveCrossColumns={moveCrossColumns}
            index={index}
            isThankYouProductPage={isThankYouProductPage}
            isisOptInProduct={isisOptInProduct}
            parentZone={parentZone}
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
    </div>
  );
};

Section.propTypes = {};

export default Section;

import React, { useEffect, useRef } from 'react';
import clx from 'classnames';
import { useDrag, useDrop } from 'react-dnd';
import ids from 'shortid';
import { getSectionBackground } from 'helpers/common';

import { SectionContent, SettingsHandles } from './components';
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

const checkIsOver10Percent = ({ dragIndex, hoverIndex, ref, monitor }) => {
  const hoverBoundingRect = ref.current?.getBoundingClientRect();
  const hover10Percent =
    (hoverBoundingRect.bottom - hoverBoundingRect.top) * 0.10;

  const clientOffset = monitor.getClientOffset();
  const hoverClientY = clientOffset.y - hoverBoundingRect.top;

  if (
    // Dragging downwards
    (dragIndex < hoverIndex && hoverClientY < hover10Percent) ||
    // Dragging upwards
    (dragIndex > hoverIndex && hoverClientY > hover10Percent)
  ) return false;

  return true;
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
  const originalIndex = findCard(id).index;
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    item: { type: dropTypes.SECTION, section, originalIndex },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
    end: (item, monitor) => {
      const { section: { id: droppedItemId } } = item;
      const didDrop = monitor.didDrop();
      if (!didDrop)
        moveCard(droppedItemId, originalIndex);

    }
  });

  const [{ isOver }, drop] = useDrop({
    accept: dropTypes.SECTION,
    collect: (monitor) => ({ isOver: monitor.isOver() }),
    hover: (sectionDetails = {}, monitor) => {
      console.log({ reference: ref.current });
      if (!ref.current) return;
      const { new: newItem, section: { id: droppedItemId } } = sectionDetails;
      const hoverIndex = index;

      if (newItem) return;
      if (sectionDetails.index === hoverIndex) return;
      const isMidWay = checkIsOverMidWay({ dragIndex: sectionDetails.index, hoverIndex, ref, monitor });

      if (!isMidWay) return;

      const { index: overIndex } = findCard(id);
      moveCard(droppedItemId, overIndex, parentZone);
      sectionDetails.index = hoverIndex;
      return { isHandled: true };
    },
    drop: (sectionDetails = {}) => {
      if (!ref.current) return;
      const { new: newItem, section: { type } } = sectionDetails;

      if (!newItem) return;

      const newId = ids.generate();
      addNewAndMove({
        atIndex: index,
        type,
        parentZone,
        id: newId
      });
      return { isHandled: true };
    }
  });

  const classes = clx({
    'product-section': true,
    'isDragging': isDragging,
    'active': activeSection.id === id,
    // 'new-dorp-space-line': isOver,
    [className]: className,
    [content.position]: content.position
  });

  const onDuplicate = (fromId) => () => {
    onSectionDuplicate(fromId, parentZone);
  };

  const isCheckoutForm = section.type === 'checkoutSection';
  const style = getSectionStyles(styles, !isCheckoutForm);
  const sectionBackground = getSectionBackground({ styles: section.styles });
  const sectionStyle = isCheckoutForm ? { ...style, ...sectionBackground } : style;

  drop(drag(ref));
  // useEffect(() => {
  //   // eslint-disable-next-line
  // }, [ref?.current]);

  const isSameSectionHovered = isOver && isDragging;

  return (
    <div ref={ref} id={id} style={{ opacity: (isOver || isDragging) ? 0.3 : 1 }} className={clx({ hoveredSection: isSameSectionHovered })}>
      {/* <DropBeforeLine show={isOver} /> */}
      <div className={classes} >
        <div style={sectionStyle}>
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
            parentZone={parentZone}
          />
          <SectionContent
            {...content}
            type={type}
            section={section}
            language={props.language}
            hasMentions={isThankYouProductPage}
            productCategory={category}
          />
        </div>
      </div>
    </div>
  );
};

Section.propTypes = {};

export default Section;

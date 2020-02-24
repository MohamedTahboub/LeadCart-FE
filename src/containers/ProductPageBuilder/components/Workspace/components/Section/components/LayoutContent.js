import React from 'react';
import PropTypes from 'prop-types';
import clx from 'classnames';
// import Section from '../index';
import { useDrag, useDrop } from 'react-dnd';
import { array } from 'yup';
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

const nestedSectionTemplate = {

};
const LayoutContent = ({
  className,
  section = {}
}) => {
  let { styles, structure: { columns = 2 } = {} } = section;

  if (!styles) styles = {};
  const sectionStyle = {
    ...styles,
    marginTop: `${styles.marginTop}px`,
    marginBottom: `${styles.marginBottom}px`,
    marginLeft: `${styles.marginLeft}px`,
    marginRight: `${styles.marginRight}px`,
    paddingTop: `${styles.paddingTop}px`,
    paddingBottom: `${styles.paddingBottom}px`,
    paddingLeft: `${styles.paddingLeft}px`,
    paddingRight: `${styles.paddingRight}px`,
    height: `${styles.height}px`,
    width: `${styles.width}px`
  };


  const classNames = clx({
    'layout-section': true,
    [className]: className,
  });

  const columnsList = Array(columns).fill(nestedSectionTemplate);
  console.log("columnsList" , columnsList)
  return (
    <div className={classNames} style={sectionStyle}>
      {columnsList.map((item) => <div key={item} className='item' />)}
    </div>
  );
};

LayoutContent.propTypes = {

};

export default LayoutContent;

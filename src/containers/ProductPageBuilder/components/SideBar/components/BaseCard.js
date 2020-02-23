import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import clx from 'classnames';
import { useDrag, useDrop } from 'react-dnd';

import DraggingPreview from '../../DraggingPreview';
import * as dropTypes from '../../Workspace/components/dropTypes';

const ElementCard = ({
  type,
  className,
  id,
  moveCard,
  findCard,
  ...props
}) => {
  // const originalIndex = findCard(id).index;

  const [{ isDragging }, drag, previewConnect] = useDrag({
    item: { type: dropTypes.SECTION, sectionType: type },
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
    <Fragment>
      <DraggingPreview type={type} connect={previewConnect} />
      <div
        className={classNames}
        {...props}
        ref={(node) => drag(node)}
        // onDragStart={onDragStart}
      />
    </Fragment>
  );
};

ElementCard.propTypes = {

};

export default ElementCard;

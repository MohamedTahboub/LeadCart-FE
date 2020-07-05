import React, { Fragment } from 'react';
import { DragPreviewImage, useDrag } from 'react-dnd';

import * as dropTypes from '../../Workspace/components/dropTypes';

const ElementCard = ({ className, ...props }) => {
  const { src, type, title } = props;
  const [{ isDragging }, drag, previewConnect] = useDrag({
    item: {
      type: dropTypes.SECTION,
      section: { type },
      new: true
    },
    collect: (monitor) => ({ isDragging: monitor.isDragging() })
  });


  // const classNames = clx('base-element-card', className);

  return (
    <Fragment>
      <DragPreviewImage connect={previewConnect} src={src} />
      <div className='builder-section__icon' ref={(node) => drag(node)}>
        <img src={src} alt={type} className='builder-section__img' />
        <p className='builder-section__title'>{title}</p>
      </div>
    </Fragment>
  );
};

ElementCard.propTypes = {};

export default ElementCard;

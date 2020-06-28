import React, { Fragment } from 'react';
import { DragPreviewImage, useDrag } from 'react-dnd';

import * as dropTypes from '../../Workspace/components/dropTypes';

const ElementCard = ({ type, src, title, ...props }) => {
  const [{ isDragging }, drag, previewConnect] = useDrag({
    item: {
      type: dropTypes.SECTION,
      section: { type },
      new: true
    },
    collect: (monitor) => ({ isDragging: monitor.isDragging() })
  });

  return (
    <Fragment>
      <DragPreviewImage connect={previewConnect} src={src} />
      <div className='builder-section__icon' ref={(node) => drag(node)} {...props}>
        <img src={src} alt={type} className='builder-section__img' />
        <p className='builder-section__title'>{title}</p>
      </div>
    </Fragment>
  );
};

export default ElementCard;

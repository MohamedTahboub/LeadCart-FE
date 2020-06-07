import React from 'react';
import common from 'components/common';
import clx from 'classnames';

const { ResizableTextarea } = common;

const featureThemes = {
  orderedCircles: 'point-ordered-circles',
  unorderedCircles: 'point-unordered-circles',
  unorderedCheckMarkCircles: 'point-unordered-circles check-marks',
  orderedRectangles: 'point-ordered-bullets',
  unorderedRectangles: 'point-unordered-bullets',
  unorderedCheckMarkRectangles: 'point-unordered-bullets check-marks'
};
const Feature = ({
  className,
  color = '#00D084',
  id,
  theme = featureThemes.orderedCircles,
  onChange,
  onDelete,
  text
}) => {
  const classes = clx({
    'section-feature-item': true,
    'with-points': theme === 'with-points'
  });

  const pointClasses = clx({
    'feature-item-point': true,
    [featureThemes[theme]]: theme
  });

  return (
    <div className={classes}>
      <span
        style={{ background: color }}
        className={pointClasses}
      >
        <span className='order'>
          {id + 1}
        </span>
      </span>
      <ResizableTextarea
        className='feature-item-input'
        name={id}
        defaultValue='Feature description'
        onChange={onChange}
        value={text}
        textarea
      />
      <span className='feature-item-delete-btn'>
        <i
          role='presentation'
          onClick={() => onDelete(id)}
          className='fas fa-trash-alt'
        />
      </span>
    </div>
  );
};

export default Feature;

import React from 'react';
import clx from 'classnames';

import QuillEditor from 'components/QuillEditor';

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
  text,
  withCustomBullets,
  customBullet
}) => {
  const classes = clx({
    'section-feature-item': true,
    'with-points': theme === 'with-points'
  });

  const pointClasses = clx({
    'feature-item-point': true,
    [featureThemes[theme]]: !withCustomBullets && theme
  });

  return (
    <div className={classes}>
      <span
        style={{ background: withCustomBullets ? `url(${customBullet}) center center / contain no-repeat` : color }}
        className={pointClasses}
      >
        {
          !withCustomBullets ? (
            <span className='order'>
              {id + 1}
            </span>
          ) : null
        }
      </span>

      <QuillEditor
        value={text || 'Feature description'}
        className='feature-item-input'
        onEdit={(value) => onChange({ target: { name: id, value } })}
        bounds='#product-builder-window'
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

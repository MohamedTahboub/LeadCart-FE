import React, { Fragment } from 'react';
import clx from 'classnames';


const PrevButton = ({ hasArrows, onMoveToPrevious, customArrows, PrevArrow, customPrevArrow, disabledPrevButton }) => {
  const isCustom = customArrows === true;

  return (
    <Fragment>
      {
        hasArrows ?
          (isCustom && customPrevArrow) ?
            <button disabled={disabledPrevButton} className={clx('image-slider-prev-arrow', { 'image-slider-disabled-arrow': disabledPrevButton })} onClick={onMoveToPrevious} style={{ backgroundImage: `url(${customPrevArrow})` }} />
            :
            <button disabled={disabledPrevButton} className={clx('image-slider-prev-arrow', { 'image-slider-disabled-arrow': disabledPrevButton })} onClick={onMoveToPrevious} >
              <PrevArrow size={16} />
            </button> :
          null
      }
    </Fragment>
  );
};

export default PrevButton;


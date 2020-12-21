import React, { Fragment } from 'react';
import clx from 'classnames';


const NextButton = ({ hasArrows, onMoveToNext, customArrows, NextArrow, customNextArrow, disabledNextButton }) => {
  const isCustom = customArrows === true;

  return (
    <Fragment>
      {
        hasArrows ?
          (isCustom && customNextArrow) ?
            <button disabled={disabledNextButton} className={clx('image-slider-next-arrow', { 'image-slider-disabled-arrow': disabledNextButton })} onClick={onMoveToNext} style={{ backgroundImage: `url(${customNextArrow})` }} />
            :
            <button disabled={disabledNextButton} className={clx('image-slider-next-arrow', { 'image-slider-disabled-arrow': disabledNextButton })} onClick={onMoveToNext} >
              <NextArrow size={16} />
            </button> :
          null
      }
    </Fragment>


  );
};

export default NextButton;

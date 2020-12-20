import React, { Fragment } from 'react';


const NextButton = ({ hasArrows, onMoveToNext, customArrows, NextArrow, customNextArrow }) => {
  const isCustom = customArrows === true;

  return (
    <Fragment>
      {
        hasArrows ?
          (isCustom && customNextArrow) ?
            <span className='image-slider-next-arrow' onClick={onMoveToNext} style={{ backgroundImage: `url(${customNextArrow})` }} />
            :
            <NextArrow size={16} className='image-slider-next-arrow' onClick={onMoveToNext}/> :
          null
      }
    </Fragment>


  );
};

export default NextButton;

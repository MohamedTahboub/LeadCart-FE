import React, { Fragment } from 'react';


const PrevButton = ({ hasArrows, onMoveToPrevious, customArrows, PrevArrow, customPrevArrow }) => {
  const isCustom = customArrows === true;

  return (
    <Fragment>
      {
        hasArrows ?
          (isCustom && customPrevArrow) ?
            <span className='image-slider-prev-arrow' onClick={onMoveToPrevious} style={{ backgroundImage: `url(${customPrevArrow})` }} />
            :
            <PrevArrow size={16} className='image-slider-prev-arrow' onClick={onMoveToPrevious} /> :
          null
      }
    </Fragment>
  );
};

export default PrevButton;


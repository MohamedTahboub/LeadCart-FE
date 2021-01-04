import React, { Fragment, useState } from 'react';
import clx from 'classnames';

import common from 'components/common';
import './style.css';

const { FlexBox } = common;

const Thumbnails = ({ hasThumbnail, onMoveToThumb, list, activeIndex, transitionDuration, currentContent = {} }) => {
  const [translateStyle, setTranslateStyle] = useState({});
  const [activeTranslateStyle, setActiveTranslateStyle] = useState({});
  const [clickedItem, setClickedItem] = useState(activeIndex);

  const activeElements = list.filter((ele, index) => {
    const isTheLast = activeIndex === list.length - 1;
    const isBeforeTheLast = activeIndex === list.length - 2;
    const start = isTheLast ? activeIndex - 4 : isBeforeTheLast ? activeIndex - 3 : activeIndex - 2;
    const end = activeIndex === 1 ? activeIndex + 4 : activeIndex + 5 ;

    return start <= index && index < end;
  });

  const isLongThumbnails = activeElements?.length >= 6;


  const onTranslateToThumb = (ele, index, selectedIndex) => () => {
    const translateOneNext = { transform: 'translateX(calc(-100% - 10px)) scale(.95) ', transition: `transform ${transitionDuration / 1000}s ease-in-out` };
    const translateTwoNext = { transform: 'translateX(calc(-200% - 20px)) scale(.95) ', transition: `transform ${transitionDuration / 1000}s ease-in-out` };
    const translateOnePrev = { transform: 'translateX(calc(100% + 10px))  scale(.95) ', transition: `transform ${transitionDuration / 1000}s ease-in-out` };
    const translateTwoPrev = { transform: 'translateX(calc(200% + 20px))  scale(.95) ', transition: `transform ${transitionDuration / 1000}s ease-in-out` };

    const activeTranslateOneNext = { transform: 'translateX(calc(-100% - 10px)) scale(1.2)  ', transition: `transform ${transitionDuration / 1000}s ease-in-out` };
    const activeTranslateTwoNext = { transform: 'translateX(calc(-200% - 20px)) scale(1.2)  ', transition: `transform ${transitionDuration / 1000}s ease-in-out` };
    const activeTranslateOnePrev = { transform: 'translateX(calc(100% + 10px))  scale(1.2) ', transition: `transform ${transitionDuration / 1000}s ease-in-out` };
    const activeTranslateTwoPrev = { transform: 'translateX(calc(200% + 20px))  scale(1.2) ', transition: `transform ${transitionDuration / 1000}s ease-in-out` };

    const targetedTranslate = (() => {
      if (index === selectedIndex + 1)
        return translateOneNext;
      if (index === selectedIndex + 2)
        return translateTwoNext;
      if (index === selectedIndex - 1)
        return translateOnePrev;
      if (index === selectedIndex - 2)
        return translateTwoPrev;

      return {};
    })();

    const activeTargetedTranslate = (() => {
      if (index === selectedIndex + 1)
        return activeTranslateOneNext;
      if (index === selectedIndex + 2)
        return activeTranslateTwoNext;
      if (index === selectedIndex - 1)
        return activeTranslateOnePrev;
      if (index === selectedIndex - 2)
        return activeTranslateTwoPrev;

      return {};
    })();

    setClickedItem(index);
    setTranslateStyle(targetedTranslate);
    setActiveTranslateStyle(activeTargetedTranslate);

    setTimeout(() => {
      onMoveToThumb(ele)();
      setTranslateStyle({});
      setActiveTranslateStyle({});
    }, transitionDuration);
  };


  const getItemStyle = (img, index) => {
    if (clickedItem === index)
      return { backgroundImage: `url(${img})`, ...activeTranslateStyle };
    else
      return { backgroundImage: `url(${img})`, ...translateStyle };
  };


  return (
    <Fragment>
      { hasThumbnail &&
      <FlexBox className='image-slider-thumbnails-container h-center v-center' >
        {isLongThumbnails ?
          <FlexBox className='image-slider-thumbnails-main-content v-center image-slider-long-thumbnails'>
            {activeElements.map((ele, index) => {
              return (
                <div
                  style={getItemStyle(ele.img, index)}
                  className={clx('image-slider-thumbnail-image', { 'active-image-slider-thumbnail-image': currentContent.id === ele.id })}
                  onClick={onTranslateToThumb(ele, index, activeElements.findIndex((ele) => ele.id === currentContent.id))}
                />
              );
            })}
          </FlexBox>

          :
          <FlexBox className='image-slider-thumbnails-main-content v-center' >
            {activeElements.map((ele, index) => {
              return (
                <div
                  style={{
                    transition: `transform ${transitionDuration / 1000}s ease-in-out, filter ${transitionDuration / 1000}s ease-in-out, border ${transitionDuration / 1000}s ease-in-out`,
                    backgroundImage: `url(${ele.img})`
                  }}
                  className={clx('image-slider-thumbnail-image', { 'active-image-slider-thumbnail-image': currentContent.id === ele.id })}
                  onClick={onMoveToThumb(ele)}
                />
              );
            })}
          </FlexBox>
        }
      </FlexBox>
      }
    </Fragment>
  );
};

export default Thumbnails;


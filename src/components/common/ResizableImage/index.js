import React, { useCallback, useRef, useState } from 'react';
import clx from 'classnames';
import { HiDotsHorizontal, HiDotsVertical } from 'react-icons/hi';

import ImageUploader from 'components/common/Image';
import { FlexBox } from '../boxes';

import { isFunction } from 'libs/checks';
import { throttle } from 'libs';
import './style.css';


const ResizableImage = ({
  src,
  alt,
  verticalResizable,
  horizontalResizable,
  maxWidth,
  maxHeight,
  className,
  style = {},
  onChange,
  name,
  hasBlurBackgroundImage,
  size: initialSize = {},
  onResize,
  onResizeStart,
  onResizeStop,
  ...props
}) => {
  const [size, setSize] = useState(initialSize);
  const expanderRef = useRef(null);


  // const throttleResizing = useCallback(throttle((height) => {
  //   onResize({ height });
  // }, size.height, 1000 / 60), [initialSize.height, initialSize.width]);


  const getRect = useCallback(() => {
    if (expanderRef)
      return expanderRef.current?.getBoundingClientRect() || {};
    else return {};
  }, [initialSize.height, initialSize.width]);


  const getCurrentSize = (e, key, status) => {
    const { y, x, height, width } = getRect();

    const getHeight = status === 'stop' ? height : e.pageY - y;
    const getWidth = status === 'stop' ? width : e.pageX - x;

    const value = key === 'height' ? getHeight : getWidth;
    const result = { key };
    result[key] = value;

    return result;
  };


  const startResizing = (key) => (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isFunction(onResizeStart)) onResizeStart(getCurrentSize(e, key), e);
    window.document.addEventListener('mousemove', tracking[key], true);
    window.document.addEventListener('mouseup', stopResizing(key), true);
  };


  const stopResizing = (key) => (e) => {
    window.document.removeEventListener('mousemove', tracking[key], true);
    window.document.removeEventListener('mouseup', stopResizing(key), true);

    if (isFunction(onResizeStop)) onResizeStop(getCurrentSize(e, key, 'stop'), e);
  };


  const tracking = {
    width: (e) => {
      setSize(getCurrentSize(e, 'width'));
    },

    height: (e) => {
      setSize(getCurrentSize(e, 'height'));
    }
  };


  // useEffect(() => {
  //   const { height, width } = size;
  //   if (isFunction(onResize)) throttleResizing.on(height);
  // }, [size.height, size.width]);


  const imageStyle = hasBlurBackgroundImage ? { backgroundImage: `url(${src})` } : {};
  const containerStyle = { height: `${size.height}px`, width: `${size.width}px` };


  const VerticalSelector = () => (
    <FlexBox
      className={clx('v-center h-center resizable-image-vertical-expander', { 'resizable-image-vertical-expander-left': verticalResizable === 'left' })}
      onMouseDown={startResizing('width')}
      role='presentation'
      draggable={false}
    >
      <HiDotsVertical />
    </FlexBox>
  );


  const HorizontalSelector = () => (
    <FlexBox
      className={clx('v-center h-center resizable-image-horizontal-expander', { 'resizable-image-horizontal-expander-top': horizontalResizable === 'top' })}
      onMouseDown={startResizing('height')}
      role='presentation'
      draggable={false}
    >
      <HiDotsHorizontal />
    </FlexBox>

  );

  return (
    <FlexBox className={`resizable-image-container ${className}`} style={{ ...imageStyle, ...style, ...containerStyle }} elementRef={expanderRef} {...props} >
      <div className='resizable-image-shadow' style={imageStyle} />

      <ImageUploader
        alt={alt}
        image={src}
        name={name}
        onChange={onChange}
        className='resizable-image-uploader'
      />

      {verticalResizable && <VerticalSelector />}
      {horizontalResizable && <HorizontalSelector />}
    </FlexBox>


  );
};

export default ResizableImage;

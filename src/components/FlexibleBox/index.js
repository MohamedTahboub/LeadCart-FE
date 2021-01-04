import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AiOutlineSmallDash } from 'react-icons/ai';
import clx from 'classnames';

import { isFunction } from 'libs/checks';
import { throttle } from 'libs';
import './style.css';

export default ({
  onResize,
  onResizeStart,
  onResizeStop,
  showOnParentHover,
  children,
  size: initialSize = {},
  className,
  style = {},
  ...props
}) => {
  const [size, setSize] = useState(initialSize);
  const [resizing, setResizing] = useState(false);
  const expanderRef = useRef(null);

  const throttleResizing = useCallback(throttle((height) => {
    onResize({ height });
  }, size.height, 1000 / 60), [initialSize.height]);

  const getRect = useCallback(() => {
    if (expanderRef)
      return expanderRef.current.getBoundingClientRect();
    else return {};
    //eslint-disable-next-line
  }, [initialSize.height]);

  const getCurrentHeight = (e) => {
    const { y } = getRect();
    const height = e.pageY - y;
    return { height };
  };

  const startResizing = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setResizing(true);
    if (isFunction(onResizeStart)) onResizeStart(getCurrentHeight(e), e);
    window.document.addEventListener('mousemove', tracking, true);
    window.document.addEventListener('mouseup', stopResizing, true);
  };

  const stopResizing = (e) => {
    setResizing(false);
    window.document.removeEventListener('mousemove', tracking, true);
    window.document.removeEventListener('mouseup', stopResizing, true);

    if (isFunction(onResizeStop)) onResizeStop(getCurrentHeight(e), e);
  };


  const tracking = (e) => {
    setSize(getCurrentHeight(e));
  };

  useEffect(() => {
    const { height } = size;
    if (isFunction(onResize)) throttleResizing.on(height);
    // eslint-disable-next-line
  }, [size.height]);

  const classNames = clx({
    [className]: className,
    'resizable-flexibleBox': true,
    'show-on-parent-hove': showOnParentHover
  });

  return (
    <div
      id='resizable-box-element'
      ref={expanderRef}
      style={{
        ...style,
        height: size.height,
        userSelect: resizing ? 'none' : ''
      }}
      className={classNames}
      {...props}
    >
      {children}
      <span
        className='expander'
        onMouseDown={startResizing}
        role='presentation'
        draggable={false}
      >
        <AiOutlineSmallDash className='gray-color expander-icon' />
      </span>
    </div>
  );
};

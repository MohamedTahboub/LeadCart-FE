import React, { useState, useRef, useEffect } from 'react';
// import ReactDOM from "react-dom";
import { AiOutlineSmallDash } from 'react-icons/ai';
import './style.css';
import { isFunction } from 'libs/checks';
import clx from 'classnames';
import { throttle } from 'libs';
export default ({
  onResize,
  onResizeStart,
  onResizeStop,
  showOnParentHover,
  children,
  size: initialSize = {},
  className,
  ...props
}) => {
  const [size, setSize] = useState(initialSize);
  const [resizing, setResizing] = useState(false);
  const expanderRef = useRef(null);

  const throttledUpdates = throttle((height) => {
    onResize({ height });
  }, size.height, 1000 / 60);
  const startResizing = (e) => {
    setResizing(true);
    if (isFunction(onResizeStart)) onResizeStart(e);
    window.document.addEventListener('mousemove', tracking, true);
    window.document.addEventListener('mouseup', stopResizing, true);
    e.preventDefault();
    e.stopPropagation();
  };

  const stopResizing = (e) => {
    setResizing(false);
    window.document.removeEventListener('mousemove', tracking, true);
    window.document.removeEventListener('mouseup', stopResizing, true);
    if (isFunction(onResizeStop)) onResizeStop(e);
    // if (isFunction(onResize)) onResize(size);
  };

  const getRect = () => {
    const element = document.getElementById('resizable-box-element');
    return element.getBoundingClientRect();
  };

  const tracking = (e) => {
    const { y } = getRect();
    const height = e.pageY - y;
    setSize({ height });
  };

  useEffect(() => {
    if (isFunction(onResize)) throttledUpdates.on(size.height);
  }, [size]);

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
        height: size.height,
        userSelect: resizing ? 'none' : ''
      }}
      className={classNames}
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

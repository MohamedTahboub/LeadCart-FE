import React, { useState, useRef, useEffect } from 'react';
// import ReactDOM from "react-dom";
import { AiOutlineSmallDash } from 'react-icons/ai';
import './style.css';
import { isFunction } from 'libs/checks';
import clx from 'classnames';

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

  const startResizing = (e) => {
    setResizing(true);
    if (isFunction(onResizeStart)) onResizeStart(e);
    window.document.addEventListener('mousemove', tracking, true);
    window.document.addEventListener('mouseup', stopResizing, true);
  };

  const stopResizing = (e) => {
    setResizing(false);
    window.document.removeEventListener('mousemove', tracking, true);
    window.document.removeEventListener('mouseup', stopResizing, true);
    if (isFunction(onResizeStop)) onResizeStop(e);
    if (isFunction(onResize)) onResize(size);
  };

  const getRect = () => expanderRef.current.getBoundingClientRect();

  const tracking = (e) => {
    const { y } = getRect();
    const height = e.pageY - y;
    setSize({ height });
  };

  // useEffect(() => {
  //   if (isFunction(onResize)) onResize(size);
  // }, [size]);

  const classNames = clx({
    [className]: className,
    'resizable-flexibleBox': true,
    'show-on-parent-hove': showOnParentHover
  });

  return (
    <div
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
      >
        <AiOutlineSmallDash className='gray-color expander-icon' />
      </span>
    </div>
  );
};

import React, { useCallback, useEffect, useRef, useState } from 'react';
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
  holdResize,
  vertical,
  forcedDimension: { forcedDimensionName, forcedDimensionValue } = {},
  ...props
}) => {
  const dimension = vertical ? 'width' : 'height';
  const oppositeDim = vertical ? 'height' : 'width';
  const [size, setSize] = useState(initialSize);
  const [resizing, setResizing] = useState(false);
  const expanderRef = useRef(null);

  const throttleResizing = useCallback(throttle((value) => {
    onResize({ [dimension]: value });
  }, size[dimension], 1000 / 60), [initialSize[dimension]]);

  const getRect = useCallback(() => {
    if (expanderRef)
      return expanderRef.current.getBoundingClientRect();
    else return {};
    //eslint-disable-next-line
  }, [initialSize[dimension]]);

  const getCurrentDimensions = (e) => {
    const { y, x } = getRect();
    const height = e.pageY - y;
    const width = e.pageX - x;
    return { height, width };
  };

  const startResizing = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setResizing(true);
    if (isFunction(onResizeStart)) onResizeStart(getCurrentDimensions(e), e);
    window.document.addEventListener('mousemove', tracking, true);
    window.document.addEventListener('mouseup', stopResizing, true);
  };

  const stopResizing = (e) => {
    setResizing(false);
    window.document.removeEventListener('mousemove', tracking, true);
    window.document.removeEventListener('mouseup', stopResizing, true);

    if (isFunction(onResizeStop)) onResizeStop(getCurrentDimensions(e), e);
  };


  const tracking = (e) => {
    setSize(getCurrentDimensions(e));
  };

  useEffect(() => {
    const { [dimension]: value } = size;
    if (isFunction(onResize)) throttleResizing.on(value);
    // eslint-disable-next-line
  }, [size[dimension]]);

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
        [dimension]: size[dimension],
        [forcedDimensionName]: forcedDimensionValue,
        userSelect: resizing ? 'none' : ''
      }}
      className={clx(classNames, { vertical })}
    >
      {children}
      {
        holdResize ?
          null : (
            <span
              className='expander'
              onMouseDown={startResizing}
              role='presentation'
              draggable={false}
            >
              <AiOutlineSmallDash className='gray-color expander-icon' />
            </span>
          )
      }
    </div>
  );
};

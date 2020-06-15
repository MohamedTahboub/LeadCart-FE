import React from 'react';
import classNames from 'classnames';

const FlexBox = ({
  className,
  column,
  spaceBetween,
  spaceAround,
  spaceEvenly,
  wrappable,
  flex,
  center,
  flexEnd,
  flexStart,
  baseline,
  children,
  reverse,
  overflow,
  elementRef,
  fullWidth,
  ...props
}) => {
  const classes = classNames({
    [className]: true,
    [center]: center,
    column,
    spaceBetween,
    spaceAround,
    spaceEvenly,
    wrappable,
    flex,
    baseline,
    flexEnd,
    reverse,
    [`overflow-${overflow}`]: overflow,
    flexStart,
    fullWidth
  });

  return (
    <div className={`flex-box ${classes}`} ref={elementRef} {...props}>
      {children}
    </div>
  );
};


export default FlexBox;

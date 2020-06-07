import React, { Fragment } from 'react';

export default ({
  children = [],
  active,
  className,
  ...props
}) => {
  const Children = Array.isArray(children) ? (
    children.find((child) => child.props.id === active) || null
  ) : (
    children
  );


  return className ? (
    <div className={className}>
      {Children}
    </div>
  ) : (
    <Fragment>
      {Children}
    </Fragment>
  );
};

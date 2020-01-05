import React from 'react';

export default ({ children = [], active, ...props }) => (
  <div>
    {Array.isArray(children) ? (
      children.find((child) => child.props.id === active) || null
    ) : (
      children
    )}
  </div>
);

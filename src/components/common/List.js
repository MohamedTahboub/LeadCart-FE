import React from 'react';


export default ({
 ordered, className, children, ...props 
}) => (
  ordered
    ? <ol className={`ordered-list ${className || ''}`}>{children}</ol>
    : <ul className={`unordered-list ${className || ''}`}>{children}</ul>
);

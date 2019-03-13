import React, { Fragment } from 'react';


export default ({
  ordered, className, onAdd, children, ...props
}) => (
    <Fragment>
      <div onClick={onAdd} role='presentation' className="add-feature-btn btn">
        <i className='fas fa-plus' />
        add new feature
        </div>
      {ordered
        ? <ol className={`ordered-list ${className || ''}`}>{children}</ol>
        : <ul className={`unordered-list ${className || ''}`}>{children}</ul>
      }
    </Fragment>
  );

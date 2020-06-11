import React from 'react';
import classNames from 'classnames';


const MainBlock = ({
  title,
  notes,
  children,
  className = '',
  containerClasses,
  blockHandel
}) => (
    <div className={`main-block ${className}`}>
      <div className='main-title-container'>
        <span className='main-title'>
          {title}
        </span>
        {notes && <span className='main-title-note'>{notes}</span>}
        {blockHandel && blockHandel}
      </div>
      {children
        && (
          <div className={classNames('box-container', containerClasses)}>
            {children}
          </div>
        )}
    </div>
  );

export default MainBlock;

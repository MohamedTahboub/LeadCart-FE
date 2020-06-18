import React from 'react';

const Cell = ({
  classNames,
  mainContent,
  sideContent,
  productNameClasses,
  subContent,
  children,
  ...props
}) => {
  return (
    <div className={classNames} {...props}>
      {mainContent && (
        !sideContent
          ? (
            <span className={productNameClasses}>
              {mainContent}
            </span>
          )
          : (
            <div>
              <span className={productNameClasses}>
                {mainContent}
              </span>
              <span className={productNameClasses}>
                {sideContent}
              </span>
            </div>
          )
      )
      }
      {typeof subContent !== 'object'
        ? <span className='cell-sub-content'>{subContent}</span>
        : <span className={`cell-sub-content ${subContent && subContent.className}`}>{subContent && subContent.content}</span>
      }
      {children}
    </div>
  );
};

export default Cell;


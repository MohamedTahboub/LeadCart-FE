import React from 'react';
import classNames from 'classnames';

const Box = ({
  header,
  contentClassName = '',
  className = '',
  content,
  footer,
  lessNormal
}) => (
    <div className={classNames({ 'normal-box': !lessNormal }, className)}>
      {header && <div className='box-header'>{header}</div>}
      {content && <div className={`box-content ${contentClassName}`}>{content}</div>}
      {footer && <div className='box-footer'>{footer}</div>}
    </div>
  );


export default Box;

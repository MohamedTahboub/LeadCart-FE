import React from 'react';
import classNames from 'classnames';
import './style.css';

export default ({ title, children, className }) => (
  <div className='mb-3'>
    <h3 className='section-header'><strong>{title}</strong></h3>
    <div className={classNames(className, 'ml-2')}>
      {children}
    </div>
  </div>
);

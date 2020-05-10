import React from 'react';
import classNames from 'classnames';

import './style.css';

const Card = ({ title, children, footer, className }) => (
  <div className={classNames(className, 'leadcart-card')}>
    {
      title && (
        <div className='card-header'>{title}</div>
      )
    }
    <div className='card-body'>{children}</div>
    {
      footer && (
        <div className='card-footer'>{footer}</div>
      )
    }
  </div>
);

export default Card;

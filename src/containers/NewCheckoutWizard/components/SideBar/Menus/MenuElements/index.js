import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

export const MenuItem = ({
  className = '',
  children,
  ...props
}) => (
  <div className={`sidebar-menu-item ${className}`}>
    {children}
  </div>
);

MenuItem.propTypes = {
  className: PropTypes.string,
  children: PropTypes.objectOf({}).isRequired
};

MenuItem.defaultProps = {
  className: ''
};


export const MenuTitle = ({
  className,
  children,
  ...props
}) => (
  <div className='sidebar-menu-title'>{children}</div>
);

export const MenuContent = ({
  className,
  children,
  ...props
}) => (
  <div className='sidebar-menu-content'>{children}</div>
);


export const MenuFlexContent = ({
  className,
  children,
  ...props
}) => (
  <div className='sidebar-menu-flex-content'>{children}</div>
);


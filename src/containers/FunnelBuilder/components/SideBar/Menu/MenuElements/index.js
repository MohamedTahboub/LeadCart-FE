import React from 'react';
import PropTypes from 'prop-types';
import clx from 'classnames';

import './style.css';

export const MenuItem = ({
  className,
  children
}) => (
  <div className={clx`sidebar-menu-item ${className}`}>
    {children}
  </div>
);

MenuItem.propTypes = {
  className: PropTypes.string,
  children: PropTypes.objectOf({}).isRequired
};

MenuItem.defaultProps = { className: '' };


export const MenuTitle = ({
  className,
  children
}) => (
  <div className={clx`sidebar-menu-title ${className}`}>
    {children}
  </div>
);

export const MenuContent = ({
  className,
  children
}) => (
  <div className={clx`sidebar-menu-content ${className}`}>
    {children}
  </div>
);


export const MenuFlexContent = ({
  className,
  children
}) => (
  <div className={clx`sidebar-menu-flex-content ${className}`}>
    {children}
  </div>
);

